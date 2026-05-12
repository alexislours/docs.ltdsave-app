import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import ts from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default defineConfig(
  globalIgnores(['dist/', 'node_modules/', '.astro/', '.wrangler/']),
  js.configs.recommended,
  ts.configs.recommended,
  astro.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      'no-undef': 'off',
    },
  },
);
