import type { Project, ProjectCategory } from './types';

export const ALL_PROJECT_CATEGORIES: ProjectCategory[] = [
	'experiments',
	'projects',
	'games',
];

export const PROJECT_FILTERS: Array<{
	label: string;
	value: ProjectCategory;
}> = [
	{ label: 'experiments', value: 'experiments' },
	{ label: 'projects', value: 'projects' },
	{ label: 'games', value: 'games' },
];

export const isProjectCategory = (value: string): value is ProjectCategory =>
	ALL_PROJECT_CATEGORIES.includes(value as ProjectCategory);

export const PROJECTS: Project[] = [
	{
		slug: 'daily-word-game',
		name: 'Daily Word Game',
		path: 'https://cipherwords.io',
		link: ['https://', 'cipherwords.io'],
		colors: ['#668bf9', '#102b56'],
		categories: ['games'],
	},
	{
		slug: 'ai-stream-assistant',
		name: 'AI Stream Assistant',
		path: 'https://tabzero.gg',
		link: ['https://', 'tabzero.gg'],
		colors: ['#BCA6F6', '#241056'],
		categories: ['projects'],
	},
	{
		slug: 'physics-type',
		name: 'Physics Type',
		path: '/physics-type',
		link: ['https://', 'haydns.website', '/physics-type'],
		colors: ['#292527', '#fe0056'],
		categories: ['experiments'],
	},
	{
		slug: 'gaming-dashboard',
		name: 'Gaming Dashboard',
		path: 'https://redditplayrust.com/stats',
		link: ['https://', 'redditplayrust.com', '/stats'],
		colors: ['#137fef', '#ffffff'],
		categories: ['projects'],
	},
	{
		slug: 'number-chain',
		name: 'Number Chain',
		path: '/number-chain',
		link: ['https://', 'haydns.website', '/number-chain'],
		colors: ['#bbeeef', '#122e2e'],
		categories: ['games'],
	},
	{
		slug: 'chatgpt-clone',
		name: 'ChatGPT Clone',
		path: 'https://tfree.chat/',
		link: ['https://', 'tfree.chat'],
		colors: ['#feaea2', '#34211e'],
		categories: ['experiments'],
	},
	{
		slug: 'vinyl-viewer',
		name: 'Vinyl Viewer',
		path: '/vinyl-player',
		link: ['https://', 'haydns.website', '/vinyl-player'],
		colors: ['#6ee576', '#1a3b1c'],
		categories: ['experiments'],
	},
	{
		slug: 'portfolio-website',
		name: 'Portfolio Website',
		path: 'https://haydncomley.com',
		link: ['https://', 'haydncomley.com'],
		colors: ['#ff595d', '#1f2121'],
		categories: ['projects', 'experiments'],
	},
];
