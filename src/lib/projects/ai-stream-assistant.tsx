import { createProject } from './create-project';

export const aiStreamAssistantProject = createProject({
	slug: 'ai-stream-assistant',
	name: 'AI Stream Assistant',
	path: 'https://tabzero.gg',
	prettyPath: ['www.', 'tabzero.gg'],
	primaryColor: '#BCA6F6',
	secondaryColor: '#241056',
	categories: ['projects'],
	description: (
		<>
			My friends started streaming and{' '}
			<b>hated having to tab out to mod their chat</b> or update Twitch details
			- with this app just <b>hit a hotkey and say what you need</b> to happen.
		</>
	),
	gallery: [
		{
			type: 'video',
			src: '/modules/ai-stream-assistant/cover.webm',
			title: 'AI assistant preview',
		},
		{
			type: 'image',
			src: '/modules/ai-stream-assistant/stream-deck.png',
			alt: 'Screenshot of the app on the Elgato Marketplace',
		},
		{
			type: 'image',
			src: '/modules/ai-stream-assistant/website.png',
			alt: 'Screenshot of the app on the Elgato Marketplace',
		},
	],
});
