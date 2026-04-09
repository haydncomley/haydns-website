import { createProject } from './create-project';

export const marketingPortfolioProject = createProject({
	slug: 'marketing-portfolio',
	name: 'Marketing Portfolio',
	path: 'https://maiacomley.com',
	prettyPath: ['www.', 'maiacomley.com'],
	primaryColor: '#f1f6df',
	secondaryColor: '#ec6334',
	categories: ['projects'],
	description: (
		<>
			My sister had just graduated, was back from travelling and was looking for
			a way to <b>showcase her work in marketing</b> - in a single day we sat
			down, and whipped up a nice looking portfolio website.
		</>
	),
	gallery: [
		{
			type: 'video',
			src: '/modules/marketing-portfolio/cover.webm',
			title: 'Portfolio preview',
			caption: 'Preview reel',
		},
		{
			type: 'image',
			src: '/modules/marketing-portfolio/desktop.png',
			alt: 'Desktop view of marketing portfolio',
		},
		{
			type: 'image',
			src: '/modules/marketing-portfolio/mobile.png',
			alt: 'Mobile view of marketing portfolio',
		},
	],
});
