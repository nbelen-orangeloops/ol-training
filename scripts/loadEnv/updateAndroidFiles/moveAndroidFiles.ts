import del from "del";
import fs from "fs-extra";
import path from "path";

import {Env} from "../Env";
import {androidJavaDebugFolderPath, androidMainFolderPath} from "../utils";

/**
 * Moves the Android files from the previous app ID folder structure to the new app ID folder structure.
 * Moves the files inside the `main/java` and `debug/java` folders.
 */
export async function moveAndroidFiles(prevAppId: string, env: Env) {
  const mainJavaFolderPath = path.resolve(androidMainFolderPath, "java");

  await Promise.all([moveJavaFolderFiles(mainJavaFolderPath, prevAppId, env), moveJavaFolderFiles(androidJavaDebugFolderPath, prevAppId, env)]);
}

async function moveJavaFolderFiles(javaFolderPath: string, prevAppId: string, env: Env) {
  const javaFilesFolderPath = path.resolve(javaFolderPath, ...prevAppId.split("."));
  const tmpFolderPath = path.resolve(javaFolderPath, "_");
  await fs.rename(javaFilesFolderPath, tmpFolderPath);

  await del(path.join(javaFolderPath, prevAppId.split(".")[0]));

  const newFolders = env.APP_ID.split(".");
  let newPath = javaFolderPath;

  for (let i = 0; i < newFolders.length - 1; i++) {
    const newFolder = newFolders[i];

    newPath = path.join(newPath, newFolder);
    await fs.mkdir(newPath);
  }

  await fs.rename(tmpFolderPath, path.join(newPath, newFolders[newFolders.length - 1]));
}
