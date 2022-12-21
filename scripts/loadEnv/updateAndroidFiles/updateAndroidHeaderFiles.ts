import fs from "fs-extra";
import path from "path";
import {glob} from "../../utils/glob";

import {Env} from "../Env";
import {androidMainFolderPath} from "../utils";

/**
 * Updates the Android header files to use the new values defined in the `env` object.
 */
export async function updateAndroidHeaderFiles(prevAppId: string, env: Env) {
  const jniFolderPath = path.resolve(androidMainFolderPath, "jni");
  const files = await glob(`**/*.h`, {cwd: path.resolve(androidMainFolderPath, jniFolderPath)});

  await Promise.all(
    files.map(async (file) => {
      const filePath = path.resolve(jniFolderPath, file);
      const content = await fs.readFile(filePath, "utf-8");
      const newContent = content.replaceAll(prevAppId.split(".").join("/"), env.APP_ID.split(".").join("/"));

      await fs.writeFile(filePath, newContent);
    })
  );
}
