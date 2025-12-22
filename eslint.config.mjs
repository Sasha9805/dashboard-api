import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
		plugins: { js },
		extends: ['js/recommended'],
		languageOptions: { globals: globals.node },
	},
	tseslint.configs.recommended,
	// prettierPlugin, // нужно импортироовать  eslint-plugin-prettier/recommended
	{
		files: ['**/*.{js,mjs,ts,mts}'],
		plugins: {
			prettier: prettierPlugin,
		},
		rules: {
			...eslintConfigPrettier.rules,
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					trailingComma: 'all',
					useTabs: true,
					semi: true,
					bracketSpacing: true,
					printWidth: 100,
					endOfLine: 'auto',
				},
			],
			// 'prettier/prettier': 'error',
			'@typescript-eslint/ban-types': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/explicit-function-return-type': 'warn',
		},
	},
]);
