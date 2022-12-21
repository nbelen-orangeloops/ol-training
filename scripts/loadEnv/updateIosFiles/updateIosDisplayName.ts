import fs from "fs-extra";

import {Env} from "../Env";
import {infoPlistPath} from "../utils";

/**
 * Returns the contents of the Info.plist file after replacing the `CFBundleDisplayName` value with the new
 * value defined in `env.APP_DISPLAY_NAME`.
 */
export async function updateIosDisplayName(env: Env): Promise<{
  shouldCleanBuild: boolean;
  infoPlistContent: string;
}> {
  let infoPlistContent = await fs.readFile(infoPlistPath, "utf-8");
  const appDisplayNameIndex = infoPlistContent.indexOf("<key>CFBundleDisplayName</key>");
  if (appDisplayNameIndex === -1) throw new Error("CFBundleDisplayName not found.");

  const prevAppDisplayName = (infoPlistContent.substring(appDisplayNameIndex).match(/<string>(.+)<\/string>/) || [""])[0].replace(/<string>(.+)<\/string>/, "$1");

  let shouldCleanBuild = false;

  if (prevAppDisplayName !== env.APP_DISPLAY_NAME) {
    shouldCleanBuild = true;

    infoPlistContent = infoPlistContent.substring(0, appDisplayNameIndex) + infoPlistContent.substring(appDisplayNameIndex).replace(/<string>(.+)<\/string>/, `<string>${env.APP_DISPLAY_NAME}</string>`);
  }

  return {
    shouldCleanBuild: shouldCleanBuild,
    infoPlistContent: infoPlistContent,
  };
}
