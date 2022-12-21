module.exports = {
  root: true,
  extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended", "plugin:import/errors", "plugin:import/warnings", "plugin:import/typescript"],

  plugins: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-object-literal-type-assertion": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/prefer-interface": "off",
    "@typescript-eslint/triple-slash-reference": "off",
    "import/default": "off",
    "import/namespace": "off",
    "import/no-named-as-default-member": "off",
    "import/no-unresolved": "off",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", ["parent", "sibling"], "index", "unknown"],
        pathGroups: [
          {
            pattern: "**/*.+(css|scss)",
            group: "unknown",
            position: "after",
          },
        ],
        alphabetize: {order: "asc", caseInsensitive: true},
        "newlines-between": "always",
      },
    ],
    "prettier/prettier": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["**/config/**", "**/scripts/**"],
      rules: {
        "import/order": "off",
      },
    },
  ],
};
