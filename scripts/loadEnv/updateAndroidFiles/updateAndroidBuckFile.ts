import fs from "fs-extra";
import path from "path";
import {projectPath} from "../../utils/projectPath";

import {Env} from "../Env";

/**
 * Updates the Android Buck file to use the new app ID.
 */
export async function updateAndroidBuckFile(prevAppId: string, env: Env) {
  const buckPath = path.resolve(projectPath, "android", "app", "_BUCK");
  const buckContent = await fs.readFile(buckPath, "utf-8");

  await fs.writeFile(buckPath, buckContent.replaceAll(prevAppId, env.APP_ID));
}
