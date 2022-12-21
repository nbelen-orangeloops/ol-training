import fs from "fs-extra";

import {Env} from "../Env";
import {infoPlistPath} from "../utils";
import {cleanIosBuild} from "./cleanIosBuild";
import {updateIosAppId} from "./updateIosAppId";
import {updateIosAppName} from "./updateIosAppName";
import {updateIosDisplayName} from "./updateIosDisplayName";

/**
 * Updates the iOS project files to reflect the new values in the env param.
 */
export async function updateIosFiles(prevAppId: string, env: Env) {
  const [updateAppIdIosResult, updateDisplayNameIosResult] = await Promise.all([updateIosAppId(prevAppId, env), updateIosDisplayName(env)]);

  const updateAppNameIosResult = await updateIosAppName(env, updateDisplayNameIosResult.infoPlistContent);

  const promises = [fs.writeFile(infoPlistPath, updateAppNameIosResult.infoPlistContent)];

  const shouldCleanBuild = updateAppIdIosResult.shouldCleanBuild || updateDisplayNameIosResult.shouldCleanBuild || updateAppNameIosResult.shouldCleanBuild;

  if (shouldCleanBuild) {
    promises.push(cleanIosBuild());
  }

  await Promise.all(promises);
}
