import {spawn} from "child_process";
import {loadEnv} from "./loadEnv";
import {promiseFromChildProcess} from "./utils/promiseFromChildProcess";

async function ios() {
  await loadEnv();

  const runIosProcess = spawn(
    "react-native",
    [
      "run-ios", //
      ...["--scheme", "Development"],
      ...["--simulator", "iPhone 14"],
    ],
    {stdio: "inherit"}
  );

  await promiseFromChildProcess(runIosProcess);
}

export default ios;
