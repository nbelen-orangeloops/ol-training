const android = require("@react-native-community/cli-platform-android");
const ios = require("@react-native-community/cli-platform-ios");

module.exports = {
  reactNativePath: "./node_modules/react-native",
  assets: ["./src/assets/fonts"],
  platforms: {
    ios: {
      projectConfig: ios.projectConfig,
      dependencyConfig: ios.dependencyConfig,
    },
    android: {
      projectConfig: android.projectConfig,
      dependencyConfig: android.dependencyConfig,
    },
  },
};
