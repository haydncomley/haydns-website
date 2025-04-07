'use client';

import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

export const usePlaylists = () => {
	const apiRef = useRef<SpotifyApi>(null);

	useEffect(() => {
		if (apiRef.current) return;

		const url = new URL(window.location.href);
		url.searchParams.forEach((value, key) => {
			url.searchParams.delete(key);
		});

		apiRef.current = SpotifyApi.withUserAuthorization(
			process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
			url.toString(),
			['playlist-read-private', 'playlist-read-collaborative'],
		);
	}, []);

	const { data: playlists } = useQuery({
		queryKey: ['spotify', 'playlists'],
		queryFn: async () => {
			if (!apiRef.current) return [];

			try {
				const res = await apiRef.current.currentUser.playlists.playlists();
				return res?.items ?? [];
			} catch (error) {
				console.error(error);
				return [];
			}
		},
	});

	return { playlists: playlists ?? [] };
};
