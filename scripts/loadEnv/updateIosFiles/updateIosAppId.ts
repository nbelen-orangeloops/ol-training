import fs from "fs-extra";
import path from "path";

import {Env} from "../Env";
import {iosFolderPath} from "../utils";

/**
 * Updates the `project.pbxproj` file to use the `env.APP_ID` value.
 */
export async function updateIosAppId(prevAppId: string, env: Env): Promise<{shouldCleanBuild: boolean}> {
  const iosProjectFilePath = path.resolve(iosFolderPath, "App.xcodeproj", "project.pbxproj");
  const iosProjectFileContent = await fs.readFile(iosProjectFilePath, "utf-8");

  let shouldCleanBuild = false;

  if (prevAppId !== env.APP_ID) {
    shouldCleanBuild = true;

    const newContent = iosProjectFileContent.replaceAll(prevAppId, env.APP_ID);
    await fs.writeFile(iosProjectFilePath, newContent);
  }

  return {shouldCleanBuild: shouldCleanBuild};
}
