import { createProject } from './create-project';

export const travelAppProject = createProject({
	slug: 'travel-app',
	name: 'Travel App',
	path: 'https://apps.apple.com/gb/app/elsewhere/id6759624543',
	prettyPath: ['App Store'],
	primaryColor: '#1e402c',
	secondaryColor: '#0df66a',
	categories: ['projects'],
	description: (
		<>
			<b>I love travelling</b>, and many of the apps I've used are either paid
			or a touch ugly - so I thought, why not make my own? This is a{' '}
			<b>
				Expo (React Native) application that allows you to track your travels
			</b>
			, and share them with friends.
		</>
	),
	gallery: [
		{
			type: 'video',
			src: '/modules/travel-app/android.webm',
			title: 'Video showing the core app',
		},
		{
			type: 'video',
			src: '/modules/travel-app/ios.webm',
			title: 'Video showing the onboarding flow',
		},
	],
});
