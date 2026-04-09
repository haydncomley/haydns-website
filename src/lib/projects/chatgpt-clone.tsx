import { createProject } from './create-project';

export const chatgptCloneProject = createProject({
	slug: 'chatgpt-clone',
	name: 'Open-Source ChatGPT Clone',
	path: 'https://tfree.chat/',
	prettyPath: ['www.', 'tfree.chat'],
	primaryColor: '#feaea2',
	secondaryColor: '#34211e',
	categories: ['experiments'],
	description: (
		<>
			A friend and I took a weekend to participate in the{' '}
			<b>T3 (YouTube) hackathon to clone ChatGPT</b>, this was our basic
			submission.
		</>
	),
	gallery: [
		{
			type: 'video',
			src: '/modules/chatgpt-clone/cover.webm',
			title: 'Hackathon preview',
			caption: 'Preview reel',
		},
	],
});
