// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'cawdev',
			description:
				'The roadmap and changelog of many projects, reachable by the coding agents doing the work.',
			logo: { src: './src/assets/logo.svg', replacesTitle: false },
			favicon: '/favicon.svg',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/4dali/cawdev' }],
			customCss: ['./src/styles/custom.css'],
			lastUpdated: true,
			sidebar: [
				{
					label: 'Start here',
					items: [
						{ label: 'What cawdev is', slug: 'start/what-cawdev-is' },
						{ label: 'The model', slug: 'start/the-model' },
						{ label: 'Your first ten minutes', slug: 'start/first-ten-minutes' },
					],
				},
				{
					label: 'Using the console',
					items: [
						{ label: 'The roadmap', slug: 'console/roadmap' },
						{ label: 'The changelog', slug: 'console/changelog' },
						{ label: 'Runs and the inbox', slug: 'console/runs' },
						{ label: 'Generated exports', slug: 'console/exports' },
					],
				},
				{
					label: 'Working with agents',
					items: [
						{ label: 'Agent tokens', slug: 'agents/tokens' },
						{ label: 'The MCP server', slug: 'agents/mcp' },
						{ label: 'The runner daemon', slug: 'agents/runner' },
					],
				},
				{
					label: 'Running a deployment',
					items: [
						{ label: 'Deploying', slug: 'admin/deploying' },
						{ label: 'Accounts and roles', slug: 'admin/accounts-and-roles' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Roadmap statuses', slug: 'reference/statuses' },
						{ label: 'Token scopes', slug: 'reference/scopes' },
						{ label: 'Run states', slug: 'reference/run-states' },
						{ label: 'Keyboard shortcuts', slug: 'reference/shortcuts' },
						{ label: 'Troubleshooting', slug: 'reference/troubleshooting' },
					],
				},
			],
		}),
	],
});
