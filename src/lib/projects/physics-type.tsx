import { createProject } from './create-project';

export const physicsTypeProject = createProject({
	slug: 'physics-type',
	name: 'Physics Type',
	path: '/physics-type',
	prettyPath: ['www.', 'haydns.website', '/physics-type'],
	primaryColor: '#292527',
	secondaryColor: '#fe0056',
	categories: ['experiments'],
	description: (
		<>
			Just a super simple web experiment using <b>Matter.js</b> that throws all
			the letters you type into a physics sandbox.
		</>
	),
	gallery: [
		{
			type: 'video',
			src: '/modules/physics-type/cover.webm',
			title: 'Experiment preview',
			caption: 'Preview reel',
		},
	],
});
