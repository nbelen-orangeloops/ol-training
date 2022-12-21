import {spawn} from "child_process";
import del from "del";
import fs from "fs-extra";
import path from "path";
import {projectPath} from "./utils/projectPath";
import {promiseFromChildProcess} from "./utils/promiseFromChildProcess";

async function start() {
  const pathToDelete = path.join(projectPath, "build");
  if (fs.existsSync(pathToDelete)) await del(pathToDelete);

  const clearWatchmanProcess = spawn("watchman", ["watch-del-all"], {stdio: "inherit"});
  await promiseFromChildProcess(clearWatchmanProcess);

  const startProcess = spawn("react-native", ["start", "--reset-cache"], {stdio: "inherit"});
  await promiseFromChildProcess(startProcess);
}

export default start;
