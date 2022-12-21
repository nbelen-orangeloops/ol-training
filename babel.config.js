const path = require("path");

module.exports = function (api) {
  api.cache(false);

  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      "lodash",
      "date-fns",
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            react: path.resolve(__dirname, "node_modules", "react"),
          },
        },
      ],
      "@babel/plugin-transform-runtime",
      "react-native-reanimated/plugin",
    ],
  };
};
