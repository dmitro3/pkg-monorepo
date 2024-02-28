/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@winrlabs/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
