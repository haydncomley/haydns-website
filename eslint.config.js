const nextPlugin = require('@next/eslint-plugin-next');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const importPlugin = require('eslint-plugin-import');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const prettierPlugin = require('eslint-plugin-prettier');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');

module.exports = [
	{
		ignores: ['node_modules/', 'dist/', '.next/', 'out/', 'build/'],
	},
	// Base configuration for all files
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		plugins: {
			import: importPlugin,
			'jsx-a11y': jsxA11yPlugin,
			'@next/next': nextPlugin,
			prettier: prettierPlugin,
			react: reactPlugin,
			'react-hooks': reactHooksPlugin,
		},
		settings: {
			'import/resolver': {
				node: {
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
			},
			react: {
				version: 'detect',
			},
		},
		rules: {
			'prettier/prettier': 'error',
			// Indentation and Formatting
			'object-curly-spacing': ['error', 'always'],
			'array-bracket-spacing': ['error', 'never'],
			'import/newline-after-import': ['error', { count: 1 }],

			// Imports
			'import/order': [
				'error',
				{
					groups: [
						['builtin', 'external'],
						'internal',
						['parent', 'sibling', 'index'],
					],
					pathGroups: [
						{
							pattern: '@/**',
							group: 'internal',
						},
					],
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],

			// Next.js specific
			'@next/next/no-html-link-for-pages': 'error',
			'@next/next/no-img-element': 'error',

			// Functions
			'func-style': ['error', 'expression'],
			'arrow-body-style': ['error', 'as-needed'],

			// React Hooks
			'react-hooks/exhaustive-deps': 'off',

			// Strings
			quotes: ['error', 'single', { avoidEscape: true }],
			'jsx-quotes': ['error', 'prefer-double'],

			// Accessibility
			'jsx-a11y/no-static-element-interactions': 'off',
			'jsx-a11y/no-noninteractive-tabindex': 'off',
			'jsx-a11y/no-noninteractive-element-interactions': 'off',
			'jsx-a11y/click-events-have-key-events': 'off',
		},
	},
	// TypeScript-specific configuration
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			'@typescript-eslint': tseslint,
		},
		settings: {
			'import/resolver': {
				typescript: {
					project: './tsconfig.json',
				},
			},
		},
		rules: {
			// TypeScript
			'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					prefer: 'type-imports',
				},
			],
		},
	},
];
