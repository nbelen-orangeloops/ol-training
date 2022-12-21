import fs from "fs-extra";
import path from "path";
import {glob} from "../../utils/glob";

import {Env} from "../Env";
import {androidSrcFolderPath} from "../utils";

/**
 * Updates the Java and Kotlin files to use the new values defined in the `env` object.
 */
export async function updateJavaAndKotlinFiles(prevAppId: string, env: Env) {
  const files = [...(await glob(`**/*.java`, {cwd: androidSrcFolderPath})), ...(await glob(`**/*.kt`, {cwd: androidSrcFolderPath}))];

  await Promise.all(
    files.map(async (file) => {
      const filePath = path.resolve(androidSrcFolderPath, file);
      const content = await fs.readFile(filePath, "utf-8");
      const newContent = content.replaceAll(prevAppId, env.APP_ID);

      await fs.writeFile(filePath, newContent);
    })
  );
}
