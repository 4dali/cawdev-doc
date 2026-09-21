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
			favicon: '/favicon.svg',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/4dali/cawdev-cli' }],
			// The design system's three faces. Sora 300 is loaded deliberately:
			// the lockup sets `dev` in 300, and without that face the browser
			// falls back to 500 and the wordmark's weight contrast disappears.
			head: [
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Sora:wght@300;500;600&display=swap',
					},
				},
			],
			// tokens.css is the design system's own file; custom.css binds
			// Starlight's variables to it. The site title is the lockup.
			customCss: ['./src/styles/custom.css'],
			components: { SiteTitle: './src/components/SiteTitle.astro' },
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
					label: 'Integration API',
					items: [
						{ label: 'Tokens and authentication', slug: 'api/integration' },
						{ label: 'Filing and reading cards', slug: 'api/calls' },
						{ label: 'Webhooks', slug: 'api/webhooks' },
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
