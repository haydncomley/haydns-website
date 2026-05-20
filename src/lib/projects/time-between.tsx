import { createProject } from './create-project';

export const timeBetweenProject = createProject({
	slug: 'time-between',
	name: 'Time Between',
	path: 'https://www.timebetween.io',
	prettyPath: ['www.', 'timebetween.io'],
	primaryColor: '#ece5d6',
	secondaryColor: '#1d8fff',
	categories: ['experiments'],
	description: (
		<>
			Check when <b> literally anything has happened, or will happen</b>. From
			"the moon landing" to "when flying cars are invented" - an LLM will place
			each one on a <b>draggable, zoomable timeline</b> so you can see the time{' '}
			between them.
		</>
	),
	gallery: [
		{
			type: 'video',
			src: '/modules/time-between/cover.webm',
			title: 'Plotting events on the timeline',
		},
		{
			type: 'video',
			src: '/modules/time-between/app-2.webm',
			title: 'Zooming across centuries',
		},
		{
			type: 'video',
			src: '/modules/time-between/app-3.webm',
			title: 'Comparing two moments',
		},
	],
});
