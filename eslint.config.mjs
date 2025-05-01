import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: {
      js,
      import: importPlugin,
    },
    languageOptions: {
      globals: globals.browser,
    },
    extends: ['js/recommended'],
    rules: {
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          pathGroups: [
            {
              pattern: '@game/common/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@game/engine/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@game/scenes/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@game/character/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@game/npc/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: './**',
              group: 'sibling',
              position: 'before',
            },
            {
              pattern: '../**',
              group: 'parent',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },
]);
