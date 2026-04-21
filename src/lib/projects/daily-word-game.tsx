import { createProject } from './create-project';

export const dailyWordGameProject = createProject({
	slug: 'daily-word-game',
	name: 'Daily Word Game',
	path: 'https://cipherwords.io',
	prettyPath: ['www.', 'cipherwords.io'],
	primaryColor: '#ffe3b9',
	secondaryColor: '#f5a320',
	categories: ['games'],
	description: (
		<>
			Over the holidays I sat down with my mum and we{' '}
			<b>vibe-coded a "wordle-like" game</b> that we could play and compete
			against each other on.
		</>
	),
	gallery: [
		{
			type: 'video',
			src: '/modules/daily-word-game/cover.webm',
			title: 'Gameplay preview',
			caption: 'Preview reel',
		},
		{
			type: 'video',
			src: '/modules/daily-word-game/mobile.webm',
			title: 'Gameplay preview',
			caption: 'Preview reel',
		},
		{
			type: 'image',
			src: '/modules/daily-word-game/dark.png',
			alt: 'Screenshot of the game in dark mode',
		},
	],
});
