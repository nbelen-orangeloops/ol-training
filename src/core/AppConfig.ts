import {en_US} from "./locales/en_US";
import {es_ES} from "./locales/es_ES";
import {Locale} from "./locales/Locale";

export type AppConfigType = {
  Settings: {
    Localization: {
      defaultLocale: Locale;
      locales: Locale[];
    };
    Server: {
      graphql: {
        apiClient: {
          baseUrl: string;
          timeout: number;
        };
      };
      rest: {
        apiClient: {
          baseUrl: string;
          timeout: number;
        };
      };
    };
  };
  Modules: {};
  Components: {};
};

export const loadConfig = (): AppConfigType => {
  const result = {
    Settings: {
      Localization: {
        defaultLocale: en_US,
        locales: [en_US, es_ES],
      },
      Server: {
        graphql: {
          apiClient: {
            baseUrl: process.env.SERVER_BASE_URL!,
            timeout: 30000,
          },
        },
        rest: {
          apiClient: {
            baseUrl: process.env.SERVER_BASE_URL!,
            timeout: 30000,
          },
        },
      },
    },
    Modules: {},
    Components: {},
  };

  AppConfig = result;
  return result;
};
export let AppConfig = loadConfig();
