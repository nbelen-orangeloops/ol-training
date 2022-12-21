import {spawn} from "child_process";
import {loadEnv} from "./loadEnv";
import {promiseFromChildProcess} from "./utils/promiseFromChildProcess";

async function android() {
  await loadEnv();

  const runIosProcess = spawn("react-native", ["run-android"], {stdio: "inherit"});

  await promiseFromChildProcess(runIosProcess);
}

export default android;
