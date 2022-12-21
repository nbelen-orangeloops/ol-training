import {spawn} from "child_process";
import {promiseFromChildProcess} from "./utils/promiseFromChildProcess";

async function precommit() {
  const loadEnvProcess = spawn("npm", ["run", "load-env"], {env: {ENVFILE: ".env.development"}});
  await promiseFromChildProcess(loadEnvProcess);

  const lintStagedProcess = spawn("lint-staged");
  await promiseFromChildProcess(lintStagedProcess);
}

export default precommit;
