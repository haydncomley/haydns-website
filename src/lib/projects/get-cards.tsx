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
			I made this <b>drinking game app</b> in order to have fun with people we
			met <b>while travelling</b>. This also came in handy when joining{' '}
			<b>university</b> as it was a{' '}
			<b>great icebreaker and way to get to know new people.</b>
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
