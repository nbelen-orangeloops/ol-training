import fs from "fs-extra";
import path from "path";

import {iosFolderPath} from "./utils";

/**
 * Returns the current app id.
 * The implementation of this function only takes into consideration the value of PRODUCT_BUNDLE_IDENTIFIER
 * in the project.pbxproj file.
 * It's assumed that the value of that field is the current app id for the iOS project and the bundle id
 * for the Android project. For example, it's expected that the folder structure of the java folder
 * in the Android project follows this app id.
 */
export async function getCurrentAppId(): Promise<string> {
  const iosProjectFilePath = path.resolve(iosFolderPath, "App.xcodeproj", "project.pbxproj");
  const iosProjectFileData = fs.readFileSync(iosProjectFilePath, "utf-8");
  const bundleIdRegEx = /PRODUCT_BUNDLE_IDENTIFIER = (.+);/g;
  const appId = (iosProjectFileData.match(bundleIdRegEx) || [""])[0].replace(bundleIdRegEx, "$1");

  return appId;
}
