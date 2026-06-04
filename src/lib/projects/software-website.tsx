import { createProject } from './create-project';

export const softwareWebsiteProject = createProject({
	slug: 'software-website',
	name: 'Corporate Website',
	path: 'https://actually.software/',
	prettyPath: ['www.', 'actually', '.software'],
	primaryColor: '#3a2230',
	secondaryColor: '#dd8ab7',
	categories: ['projects'],
	description: (
		<>
			A <b>hub for my software company</b>, built mainly just to link out to out
			projects and act as a hub for our brand. While its fairly simple, I really
			love the modern-retro design with animated flourishes throughout.
		</>
	),
	gallery: [
		{
			type: 'video',
			src: '/modules/software-website/cover.webm',
			title: 'Walkthrough of the site',
		},
		{
			type: 'video',
			src: '/modules/software-website/mobile.webm',
			title: 'Mobile experience',
		},
		{
			type: 'image',
			src: '/modules/software-website/desktop-light.png',
			alt: 'Desktop view in light mode',
		},
		{
			type: 'image',
			src: '/modules/software-website/desktop-dark.png',
			alt: 'Desktop view in dark mode',
		},
	],
});
