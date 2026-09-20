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
					label: 'CLI & configuration',
					items: [
						{ label: 'Installing and signing in', slug: 'cli/installing' },
						{ label: 'The config file', slug: 'cli/config-file' },
						{ label: 'Environment variables', slug: 'cli/environment-variables' },
						{ label: 'The attached terminal', slug: 'cli/terminal-ui' },
						{ label: 'The runner daemon', slug: 'cli/runner-daemon' },
						{ label: 'Lifecycle and stages', slug: 'cli/lifecycle-and-stages' },
						{ label: 'Permissions and the shield', slug: 'cli/permissions-and-shield' },
						{ label: 'Troubleshooting', slug: 'cli/troubleshooting' },
					],
				},
				{
					label: 'MCP server',
					items: [
						{ label: 'Setting it up', slug: 'mcp/setup' },
						{ label: 'Tool reference', slug: 'mcp/tools' },
						{ label: 'The working method it teaches', slug: 'mcp/working-method' },
					],
				},
				{
					label: 'Web console',
					items: [
						{ label: 'Finding your way around', slug: 'console/overview' },
						{ label: 'Plan: Roadmap, Issues, Backlog, Sprints', slug: 'console/plan' },
						{ label: 'Work: Development and Sessions', slug: 'console/work' },
						{ label: 'Code: Git, Codemap, Changelog', slug: 'console/code' },
						{ label: 'Project settings', slug: 'console/project-settings' },
						{ label: 'Your account', slug: 'console/your-account' },
						{ label: 'Administration', slug: 'console/administration' },
						{ label: 'Generated exports', slug: 'console/exports' },
					],
				},
			],
		}),
	],
});
