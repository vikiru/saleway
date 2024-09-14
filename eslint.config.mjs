import eslintNode from "eslint-plugin-node";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import eslintPrettier from "eslint-config-prettier";
import eslintTailwind from "eslint-plugin-tailwindcss";
import globals from "globals";
import pluginJs from "@eslint/js";
import sonarjs from "eslint-plugin-sonarjs";
import sortExports from "eslint-plugin-sort-exports";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    languageOptions: {
      parser: "@typescript-eslint/parser",
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPrettier,
  sonarjs.configs.recommended,
  {
    plugins: {
      sortExports: sortExports,
      unusedImports: unusedImports,
      node: eslintNode,
      tailwindcss: eslintTailwind,
      unicorn: eslintPluginUnicorn,
      sonar: sonarjs,
    },
  },
  {
    rules: {
      "no-undef": "off",
    },
  },
  { ignores: ["node_modules/", ".github/", "*.json"] },
];
