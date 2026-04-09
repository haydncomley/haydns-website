import { createProject } from './create-project';

export const numberChainProject = createProject({
	slug: 'number-chain',
	name: 'Number Puzzle',
	path: '/number-chain',
	prettyPath: ['www.', 'haydns.website', '/number-chain'],
	primaryColor: '#bbeeef',
	secondaryColor: '#122e2e',
	categories: ['games'],
	description: (
		<>
			I made a really simple number based game years ago within <b>Unity</b> and
			took a weekend just to <b>port it over to the web</b>.
		</>
	),
	gallery: [
		{
			type: 'video',
			src: '/modules/number-chain/cover.webm',
			title: 'Puzzle preview',
			caption: 'Preview reel',
		},
	],
});
