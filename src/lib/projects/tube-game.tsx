import { createProject } from './create-project';

export const tubeGameProject = createProject({
	slug: 'tube-game',
	name: 'Tube Game',
	path: 'https://tube-game.vercel.app/',
	prettyPath: ['www.', 'tube-game.', 'vercel.app'],
	primaryColor: '#9ab1fe',
	secondaryColor: '#1c2a5c',
	categories: ['games'],
	description: (
		<>
			This was a simple project on the backburner for a while,{' '}
			<b>simply just guess London tube lines along a commute</b>. Either pick a
			random line or create your own commute and share it with your friends.
		</>
	),
	gallery: [
		{
			type: 'video',
			src: '/modules/tube-game/mobile.webm',
			title: 'Tube Game (Mobile)',
		},
		{
			type: 'video',
			src: '/modules/tube-game/cover.webm',
			title: 'Tube Game',
		},
	],
});
