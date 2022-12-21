import {Platform} from "react-native";

// Polyfills required to use Intl with Hermes engine
// https://github.com/facebook/hermes/issues/23

if ((global as any).HermesInternal) {
  if (Platform.OS === "ios") {
    require("@formatjs/intl-getcanonicallocales/polyfill");
    require("@formatjs/intl-locale/polyfill");
    require("@formatjs/intl-pluralrules/polyfill");
    require("@formatjs/intl-pluralrules/locale-data/en");
    require("@formatjs/intl-numberformat/polyfill");
    require("@formatjs/intl-numberformat/locale-data/en");
    require("@formatjs/intl-datetimeformat/polyfill");
    require("@formatjs/intl-datetimeformat/locale-data/en");
    require("@formatjs/intl-datetimeformat/add-all-tz");
  } else {
    require("@formatjs/intl-getcanonicallocales/polyfill");
    require("@formatjs/intl-locale/polyfill");
    require("@formatjs/intl-datetimeformat/polyfill");
    require("@formatjs/intl-datetimeformat/locale-data/en");
    require("@formatjs/intl-datetimeformat/add-all-tz");
  }
}
