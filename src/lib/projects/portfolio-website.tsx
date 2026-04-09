import { createProject } from './create-project';

export const portfolioWebsiteProject = createProject({
	slug: 'portfolio-website',
	name: 'Interactive Portfolio Website',
	path: 'https://haydncomley.com',
	prettyPath: ['www.', 'haydncomley.com'],
	primaryColor: '#ff595d',
	secondaryColor: '#1f2121',
	categories: ['projects', 'experiments'],
	description: (
		<>
			My ever changing personal website - I've always loved{' '}
			<b>productivity tools</b> and had an old University project laying around
			so I converted it into an <b>interactive portfolio</b>.
		</>
	),
	gallery: [
		{
			type: 'video',
			src: '/modules/portfolio-website/cover.webm',
			title: 'Portfolio website preview',
			caption: 'Preview reel',
		},
	],
});
