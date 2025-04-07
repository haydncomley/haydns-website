'use client';

import { useQuery } from '@tanstack/react-query';

import { useSpotify } from '../use-spotify';

export const usePlaylists = () => {
	const { spotify } = useSpotify();

	const { data: playlists } = useQuery({
		queryKey: ['spotify', 'playlists'],
		enabled: !!spotify,
		queryFn: async () => {
			if (!spotify) return [];

			try {
				const res = await spotify.currentUser.playlists.playlists();
				return res?.items ?? [];
			} catch (error) {
				console.error(error);
				return [];
			}
		},
	});

	return { playlists: playlists ?? [] };
};
