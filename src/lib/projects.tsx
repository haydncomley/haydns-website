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
	{ label: 'side projects', value: 'projects' },
	{ label: 'experiments', value: 'experiments' },
	{ label: 'games', value: 'games' },
];

export const isProjectCategory = (value: string): value is ProjectCategory =>
	ALL_PROJECT_CATEGORIES.includes(value as ProjectCategory);

export const PROJECTS: Project[] = [
	{
		slug: 'gaming-dashboard',
		name: 'Gaming Dashboard',
		path: 'https://redditplayrust.com/stats',
		link: ['https://', 'redditplayrust.com', '/stats'],
		colors: ['#137fef', '#ffffff'],
		categories: ['projects'],
		description: (
			<>
				This web app allows both <b>players to view their realtime stats</b> as
				well as allowing <b>admins to manage their community</b>, ban bad actors
				and triage support requests.
			</>
		),
	},
	{
		slug: 'ai-stream-assistant',
		name: 'AI Stream Assistant',
		path: 'https://tabzero.gg',
		link: ['https://', 'tabzero.gg'],
		colors: ['#BCA6F6', '#241056'],
		categories: ['projects'],
		description: (
			<>
				My friends started streaming and{' '}
				<b>hated having to tab out to mod their chat</b> or update Twitch
				details - with this app just <b>hit a hotkey and say what you need</b>{' '}
				to happen.
			</>
		),
	},
	{
		slug: 'marketing-portfolio',
		name: 'Marketing Portfolio',
		path: 'https://maiacomley.com',
		link: ['https://', 'maiacomley.com'],
		colors: ['#f1f6df', '#ec6334'],
		categories: ['projects'],
		description: (
			<>
				My sister had just graduated, was back from travelling and was looking
				for a way to <b>showcase her work in marketing</b> - in a single day day
				we sat down, and whipped up a nice looking portfolio website.
			</>
		),
	},
	{
		slug: 'daily-word-game',
		name: 'Daily Word Game',
		path: 'https://cipherwords.io',
		link: ['https://', 'cipherwords.io'],
		colors: ['#668bf9', '#102b56'],
		categories: ['games'],
		description: (
			<>
				Over the holidays I sat down with my mum and we{' '}
				<b>vibe-coded a "wordle-like" game</b> that we could play and compete
				against each other on.
			</>
		),
	},
	{
		slug: 'number-chain',
		name: 'Number Puzzle',
		path: '/number-chain',
		link: ['https://', 'haydns.website', '/number-chain'],
		colors: ['#bbeeef', '#122e2e'],
		categories: ['games'],
		description: (
			<>
				I made a really simple number based game years ago within <b>Unity</b>{' '}
				and took a weekend just to port it over to the web.
			</>
		),
	},
	{
		slug: 'physics-type',
		name: 'Physics Type',
		path: '/physics-type',
		link: ['https://', 'haydns.website', '/physics-type'],
		colors: ['#292527', '#fe0056'],
		categories: ['experiments'],
		description: (
			<>
				Just a super simple web experiment using <b>Matter.js</b> that throws
				all the letters you type into a physics sandbox
			</>
		),
	},
	{
		slug: 'chatgpt-clone',
		name: 'Open-Source ChatGPT Clone',
		path: 'https://tfree.chat/',
		link: ['https://', 'tfree.chat'],
		colors: ['#feaea2', '#34211e'],
		categories: ['experiments'],
		description: (
			<>
				A friend and I took a weekend to participate in the{' '}
				<b>T3 (YouTube) hackathon to clone ChatGPT</b>, this was our basic
				submission.
			</>
		),
	},
	{
		slug: 'vinyl-viewer',
		name: 'Spotify Playlist Viewer',
		path: '/vinyl-player',
		link: ['https://', 'haydns.website', '/vinyl-player'],
		colors: ['#6ee576', '#1a3b1c'],
		categories: ['experiments'],
		description: (
			<>
				This may or may not work as Spotify is locking down their APIs - but it
				just authenticates you and then displays all your playlists in a pretty
				way.
			</>
		),
	},
	{
		slug: 'portfolio-website',
		name: 'Interactive Portfolio Website',
		path: 'https://haydncomley.com',
		link: ['https://', 'haydncomley.com'],
		colors: ['#ff595d', '#1f2121'],
		categories: ['projects', 'experiments'],
		description: (
			<>
				My ever changing personal website - I've always loved productivity tools
				and had an old University project laying around so I converted it into
				an interactive portfolio.
			</>
		),
	},
];
