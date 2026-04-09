import { createProject } from './create-project';

export const samPlantProject = createProject({
	slug: 'sam-plant',
	name: 'Machinery Website',
	path: 'https://samplantmachinery.com',
	prettyPath: ['www.', 'samplantmachinery.com'],
	primaryColor: '#ffc71e',
	secondaryColor: '#11100e',
	categories: ['projects'],
	description: (
		<>
			I don't only create things with no commercial viability, being able to{' '}
			<b>leverage AI</b> means I can <b>focus with more intent on the design</b>{' '}
			and create prototypes quickly. It also means I can then go in and spend
			extra time and care on{' '}
			<b>adding the bells and whistles that make the UX better for us humans</b>
			.
		</>
	),
	gallery: [
		{
			type: 'video',
			src: '/modules/sam-plant/cover.webm',
			title: 'Site preview',
			caption: 'Preview reel',
		},
		{
			type: 'image',
			src: '/modules/sam-plant/stock.png',
			alt: 'Stock page for machinery website',
		},
		{
			type: 'image',
			src: '/modules/sam-plant/listing.png',
			alt: 'Listing page for an item of stock',
		},
	],
});
