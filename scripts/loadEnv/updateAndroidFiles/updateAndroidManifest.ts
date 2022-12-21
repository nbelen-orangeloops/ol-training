import fs from "fs-extra";
import path from "path";

import {Env} from "../Env";
import {androidMainFolderPath} from "../utils";

/**
 * Updates the AndroidManifest.xml file to use the new values defined in the `env` object.
 */
export async function updateAndroidManifest(prevAppId: string, env: Env) {
  const manifestPath = path.resolve(androidMainFolderPath, "AndroidManifest.xml");
  const content = await fs.readFile(manifestPath, "utf-8");
  const newContent = content.replaceAll(prevAppId, env.APP_ID);

  await fs.writeFile(manifestPath, newContent);
}
