import del from "del";
import fs from "fs-extra";
import path from "path";

import {iosFolderPath} from "../utils";

/**
 * Deletes the iOS `build` folder.
 */
export async function cleanIosBuild() {
  const iosBuildFolder = path.resolve(iosFolderPath, "build");
  if (fs.existsSync(iosBuildFolder)) await del(iosBuildFolder);
}
