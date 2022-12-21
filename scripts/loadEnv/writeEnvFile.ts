import dotenv from "dotenv";
import fs from "fs-extra";
import path from "path";

import {Env} from "./Env";
import {iosFolderPath} from "./utils";

export async function writeEnvFile(envFileName: string): Promise<Env> {
  const envFilePath = path.resolve("/tmp", "envfile");

  if (fs.existsSync(envFilePath)) fs.unlinkSync(envFilePath);
  await fs.writeFile(envFilePath, envFileName);

  const defaultEnv = dotenv.parse(await fs.readFile(".env"));
  const env = fs.existsSync(envFileName) ? dotenv.parse(await fs.readFile(envFileName)) : {};
  let envContent = "";

  console.log("Using env file:", envFileName);
  Object.keys(defaultEnv).forEach((key) => {
    if (env[key] === undefined) {
      env[key] = defaultEnv[key];
      console.log("default env value used for ", key);
    } else console.log("specific env value used for", key);

    envContent += `${key}=${env[key]}\n`;
  });

  await fs.writeFile(path.resolve(iosFolderPath, "tmp.xcconfig"), envContent);

  return env as Env;
}
