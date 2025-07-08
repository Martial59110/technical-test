import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    files: ["**/*.ts"],
    plugins: { "@typescript-eslint": tseslint.plugin },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
    
      "no-unused-vars": "warn",
      "no-explicit-any": "error",
    },
  },
  { ignores: ["**/*.js", "**/*.cjs", "**/*.mjs"] },
]);
