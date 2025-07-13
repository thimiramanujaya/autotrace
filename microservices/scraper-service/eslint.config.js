import { defineConfig, globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import typescriptParser from "@typescript-eslint/parser";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default defineConfig([
  globalIgnores(["dist/**/*"]),
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: "module",
      },
    },
    extends: [eslint.configs.recommended, tseslint.configs.recommended],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "prettier/prettier": "error",
    },
  },
]);
