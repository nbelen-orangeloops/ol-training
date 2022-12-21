import {Env} from "../Env";
import {moveAndroidFiles} from "./moveAndroidFiles";
import {updateAndroidBuckFile} from "./updateAndroidBuckFile";
import {updateAndroidHeaderFiles} from "./updateAndroidHeaderFiles";
import {updateAndroidManifest} from "./updateAndroidManifest";
import {updateJavaAndKotlinFiles} from "./updateJavaAndKotlinFiles";

/**
 * Updates the Android files to use the new values defined in the `env` object.
 */
export async function updateAndroidFiles(prevAppId: string, env: Env) {
  await moveAndroidFiles(prevAppId, env);

  await Promise.all([updateJavaAndKotlinFiles(prevAppId, env), updateAndroidHeaderFiles(prevAppId, env), updateAndroidBuckFile(prevAppId, env), updateAndroidManifest(prevAppId, env)]);
}
