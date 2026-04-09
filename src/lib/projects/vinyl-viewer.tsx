import { createProject } from './create-project';

export const vinylViewerProject = createProject({
	slug: 'vinyl-viewer',
	name: 'Spotify Playlist Viewer',
	path: '/vinyl-player',
	prettyPath: ['www.', 'haydns.website', '/vinyl-player'],
	primaryColor: '#6ee576',
	secondaryColor: '#1a3b1c',
	categories: ['experiments'],
	description: (
		<>
			This may or may not work as Spotify is locking down their APIs - but it
			just authenticates you and then displays all your playlists in a pretty
			way.
		</>
	),
	gallery: [
		{
			type: 'video',
			src: '/modules/vinyl-viewer/cover.webm',
			title: 'Playlist viewer preview',
			caption: 'Preview reel',
		},
	],
});
