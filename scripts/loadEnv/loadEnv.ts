import {getCurrentAppId} from "./getCurrentAppId";
import {updateAndroidFiles} from "./updateAndroidFiles/updateAndroidFiles";
import {updateIosFiles} from "./updateIosFiles/updateIosFiles";
import {writeEnvFile} from "./writeEnvFile";

export async function loadEnv() {
  const {DEFAULT_ENVFILE} = process.env;
  let {ENVFILE} = process.env;

  if (!ENVFILE) {
    if (!DEFAULT_ENVFILE) throw new Error("ENVFILE environment variable not set.");

    ENVFILE = DEFAULT_ENVFILE;
  }

  const prevAppIdPromise = getCurrentAppId();
  const env = await writeEnvFile(ENVFILE);
  const prevAppId = await prevAppIdPromise;

  await Promise.all([updateIosFiles(prevAppId, env), updateAndroidFiles(prevAppId, env)]);
}

export default loadEnv;
