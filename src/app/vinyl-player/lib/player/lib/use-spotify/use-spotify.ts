'use client';

import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { useQuery } from '@tanstack/react-query';

export const useSpotify = () => {
	const { data } = useQuery({
		queryKey: ['spotify'],
		queryFn: async () => {
			const url = new URL(window.location.href);
			url.searchParams.forEach((value, key) => {
				url.searchParams.delete(key);
			});

			console.log(url.toString());

			return SpotifyApi.withUserAuthorization(
				process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
				url.toString(),
				['playlist-read-private', 'playlist-read-collaborative'],
			);
		},
	});

	return { spotify: data };
};
