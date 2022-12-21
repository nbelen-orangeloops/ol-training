import {codegen} from "@graphql-codegen/core";
import * as typescriptPlugin from "@graphql-codegen/typescript";
import * as typescriptResolversPlugin from "@graphql-codegen/typescript-resolvers";
import {loadSchema} from "@graphql-tools/load";
import {UrlLoader} from "@graphql-tools/url-loader";
import {ESLint} from "eslint";

import fs from "fs";
import {parse, printSchema} from "graphql";
import path from "path";

export const writeFile = async (filePath: string, content: string) => {
  fs.writeFileSync(filePath, content);
  const output = await new ESLint({
    fix: true,
  }).lintFiles([filePath]);
  fs.writeFileSync(filePath, output[0].output ?? content);
};

async function graphqlCodegen() {
  const projectPath = path.resolve(__dirname, "..");

  const remoteSchema = await loadSchema("http://localhost:4000/graphql", {loaders: [new UrlLoader()]});
  const remoteSchemaFilePath = path.resolve(projectPath, "src", "core", "apiclient", "graphql", "GraphQLAPIClientSchema.ts");
  writeFile(remoteSchemaFilePath, 'import {gql} from "graphql-tag";\n\n' + "export const typeDefs = gql`" + printSchema(remoteSchema).replace(/`/g, "\\`") + "`");

  const remoteSchemaTypesFilePath = path.resolve(projectPath, "src", "core", "apiclient", "graphql", "GraphQLAPIClientSchema.types.ts");
  const remoteSchemaTypesFileContent = await codegen({
    schema: parse(printSchema(remoteSchema)),
    documents: [],
    filename: remoteSchemaTypesFilePath,
    plugins: [
      {
        typescript: {},
      },
      {
        typescriptResolvers: {
          enumsAsTypes: true,
          noSchemaStitching: true,
          contextType: "{headers?: Record<string, string | undefined>}",
        },
      },
    ],
    pluginMap: {
      typescript: typescriptPlugin,
      typescriptResolvers: typescriptResolversPlugin,
    },
    config: {},
  });
  writeFile(remoteSchemaTypesFilePath, `// eslint-disable-next-line @typescript-eslint/ban-ts-comment\n` + `// @ts-nocheck\n` + remoteSchemaTypesFileContent);
}

export default graphqlCodegen;
