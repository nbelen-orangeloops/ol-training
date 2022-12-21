const path = require("path");

require("@babel/register")({
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {node: 16},
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: ["@babel/plugin-transform-runtime", ["@babel/plugin-proposal-private-property-in-object", {loose: true}]],
  extensions: [".js", ".ts"],
});

require(path.resolve(__dirname, "..", process.argv[2])).default();
