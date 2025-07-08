import { defineConfig } from "eslint/config";
import plugin from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

export default defineConfig([
  {
    files: ["**/*.ts"],
    plugins: { "@typescript-eslint": plugin },
    languageOptions: {
      parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "no-var": "error",
      "no-console": "warn",
    },
  },
  { ignores: ["**/*.js", "**/*.cjs", "**/*.mjs"] },
]);