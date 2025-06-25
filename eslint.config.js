// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";
import react from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{ ignores: ["dist"] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			react: react,
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
			"simple-import-sort": simpleImportSort,
			"unused-imports": unusedImports,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			...react.configs.recommended.rules,
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true },
			],
			// Simple import sort rules
			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",
			// Unused imports rules
			"unused-imports/no-unused-imports": "error",
			"unused-imports/no-unused-vars": [
				"warn",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],
			// React rules
			"react/react-in-jsx-scope": "off", // Not needed with React 17+
			"react/jsx-uses-react": "off", // Not needed with React 17+
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
	storybook.configs["flat/recommended"]
);
