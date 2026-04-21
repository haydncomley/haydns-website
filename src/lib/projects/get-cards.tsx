import { createProject } from './create-project';

export const getCardsProject = createProject({
	slug: 'get-cards',
	name: 'GetCards',
	path: 'https://apps.apple.com/us/app/getcards/id1410296798',
	prettyPath: ['App Store'],
	primaryColor: '#531722',
	secondaryColor: '#f83054',
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
			src: '/modules/get-cards/mobile.webm',
			title: 'GetCards App',
		},
		{
			type: 'video',
			src: '/modules/get-cards/cover.webm',
			title: 'GetCards Store Page',
		},
		{
			type: 'image',
			src: '/modules/get-cards/store-1.webp',
			alt: 'GetCards App Store Screenshot 1',
		},
		{
			type: 'image',
			src: '/modules/get-cards/store-2.webp',
			alt: 'GetCards App Store Screenshot 2',
		},
		{
			type: 'image',
			src: '/modules/get-cards/store-3.webp',
			alt: 'GetCards App Store Screenshot 3',
		},
	],
});
