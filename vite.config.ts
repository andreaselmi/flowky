/// <reference types="vitest/config" />
/// <reference types="vitest" />
// https://vite.dev/config/
import path from "node:path";
import { fileURLToPath } from "node:url";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

const dirname =
	typeof __dirname !== "undefined"
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));

const isCI = process.env.CI === "true";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
	plugins: [
		react(),
		checker({
			typescript: {
				tsconfigPath: "./tsconfig.app.json",
			},
		}),
	],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"],
		// Reporter ottimizzato per CI
		reporters: isCI ? ["default", "github-actions"] : ["default"],
		projects: [
			{
				// Unit tests project
				extends: true,
				test: {
					name: "unit",
					include: ["**/*.{test,spec}.{js,ts,jsx,tsx}"],
					exclude: ["**/*.stories.{js,ts,jsx,tsx}", "node_modules/"],
				},
			},
			{
				// Storybook tests project
				extends: true,
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
					// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
					storybookTest({
						configDir: path.join(dirname, ".storybook"),
					}),
				],
				test: {
					name: "storybook",
					browser: {
						enabled: true,
						headless: true,
						provider: "playwright",
						instances: [
							{
								browser: "chromium",
							},
						],
						// Additional options for CI
						providerOptions: isCI
							? {
									launch: {
										args: [
											"--no-sandbox",
											"--disable-setuid-sandbox",
											"--disable-gpu",
										],
									},
								}
							: {},
					},
					setupFiles: [".storybook/vitest.setup.ts"],
					exclude: ["node_modules/"],
					// Higher timeouts for CI
					testTimeout: isCI ? 30000 : 10000,
					hookTimeout: isCI ? 30000 : 10000,
				},
			},
		],
	},
});
