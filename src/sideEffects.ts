import "./localePolyfill";
import "react-native-gesture-handler";
import "./locales";
import {Config} from "react-native-config";

import {loadConfig} from "./AppConfig";

process.env = {
  ...Config,
};

loadConfig();
