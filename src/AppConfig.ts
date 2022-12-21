import {loadConfig as loadCoreConfig, AppConfigType as CoreAppConfigType} from "./core/AppConfig";
import {CoreHelper} from "./core/utils/CoreHelper";

export type UIAppConfig = {};

const UIAppConfig: UIAppConfig = {};

export type AppConfigType = CoreAppConfigType & UIAppConfig;
export const loadConfig = (): AppConfigType => {
  const result = CoreHelper.mergeWith(loadCoreConfig(), UIAppConfig);

  AppConfig = result;
  return result;
};

export let AppConfig = loadConfig();
