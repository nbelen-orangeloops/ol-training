import path from "path";
import {projectPath} from "../utils/projectPath";

export const androidFolderPath = path.resolve(projectPath, "android");
export const androidSrcFolderPath = path.resolve(androidFolderPath, "app", "src");
export const androidMainFolderPath = path.resolve(androidSrcFolderPath, "main");
export const androidJavaDebugFolderPath = path.resolve(androidSrcFolderPath, "debug", "java");

export const iosFolderPath = path.resolve(projectPath, "ios");
export const infoPlistPath = path.resolve(iosFolderPath, "App", "Info.plist");
