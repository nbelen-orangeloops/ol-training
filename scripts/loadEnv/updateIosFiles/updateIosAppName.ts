import {Env} from "../Env";

/**
 * Returns the `infoPlistContent` after replacing the `CFBundleName` value with the new `env.APP_NAME` value.
 */
export async function updateIosAppName(
  env: Env,
  infoPlistContent: string
): Promise<{
  shouldCleanBuild: boolean;
  infoPlistContent: string;
}> {
  const appNameIndex = infoPlistContent.indexOf("<key>CFBundleName</key>");
  if (appNameIndex === -1) throw new Error("CFBundleName not found.");

  const prevAppName = (infoPlistContent.substring(appNameIndex).match(/<string>(.+)<\/string>/) || [""])[0].replace(/<string>(.+)<\/string>/, "$1");

  let shouldCleanBuild = false;
  if (prevAppName !== env.APP_NAME) {
    shouldCleanBuild = true;

    infoPlistContent = infoPlistContent.substring(0, appNameIndex) + infoPlistContent.substring(appNameIndex).replace(/<string>(.+)<\/string>/, `<string>${env.APP_NAME}</string>`);
  }

  return {
    infoPlistContent: infoPlistContent,
    shouldCleanBuild: shouldCleanBuild,
  };
}
