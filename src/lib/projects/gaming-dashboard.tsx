import { createProject } from './create-project';

export const gamingDashboardProject = createProject({
	slug: 'gaming-dashboard',
	name: 'Gaming Dashboard',
	path: 'https://redditplayrust.com/stats',
	prettyPath: ['www.', 'redditplayrust.com', '/stats'],
	primaryColor: '#137fef',
	secondaryColor: '#ffffff',
	categories: ['projects'],
	description: (
		<>
			This web app allows both <b>players to view their realtime stats</b> as
			well as allowing <b>admins to manage their community</b>, ban bad actors
			and triage support requests.
		</>
	),
	gallery: [
		{
			type: 'video',
			src: '/modules/gaming-dashboard/cover.webm',
			title: 'Video showing leaderboards',
		},
		{
			type: 'video',
			src: '/modules/gaming-dashboard/create-ticket.mov',
			title: 'Video showing admin area',
		},
		{
			type: 'image',
			src: '/modules/gaming-dashboard/stats-2.png',
			alt: 'Dashboard preview in dark mode',
		},
		{
			type: 'image',
			src: '/modules/gaming-dashboard/stats-4.png',
			alt: 'Dashboard preview in dark mode on mobile',
		},
		{
			type: 'image',
			src: '/modules/gaming-dashboard/stats-3.png',
			alt: 'Dashboard preview in dark mode on mobile',
		},
	],
});
