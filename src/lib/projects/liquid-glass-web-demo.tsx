import { createProject } from './create-project';

export const liquidGlassProject = createProject({
	slug: 'liquid-glass',
	name: 'Liquid Glass on Web',
	path: 'https://web-liquid-glass.vercel.app/',
	prettyPath: ['Web Demo'],
	primaryColor: '#dff1ff',
	secondaryColor: '#1194fb',
	categories: ['experiments'],
	description: (
		<>
			Chrome came out with a new experimental flag for html-in-canvas, with this
			its the first time the Web can get close to a real <b>"Liquid Glass"</b>{' '}
			effect using <b>shaders and WebGL</b>.
		</>
	),
	gallery: [
		{
			type: 'video',
			src: '/modules/liquid-glass/mobile.webm',
			title: 'Liquid Glass Demo App',
		},
		{
			type: 'video',
			src: '/modules/liquid-glass/desktop.webm',
			title: 'Liquid Glass Demo App on Desktop',
		},
		{
			type: 'video',
			src: '/modules/liquid-glass/cover.webm',
			title: 'Liquid Glass Navigation Bar',
		},
	],
});
