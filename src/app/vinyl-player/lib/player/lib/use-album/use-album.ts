'use client';

import { useQuery } from '@tanstack/react-query';

import { useSpotify } from '../use-spotify';

type useAlbumProps = {
	playlistId?: string;
};

export const useAlbum = ({ playlistId }: useAlbumProps) => {
	const { spotify } = useSpotify();

	const { data, isLoading } = useQuery({
		queryKey: ['spotify', 'tracks', playlistId],
		enabled: !!spotify && !!playlistId,
		queryFn: async () => {
			if (!spotify || !playlistId) return null;
			return spotify.playlists.getPlaylist(playlistId);
		},
	});

	return {
		album: data,
		isAlbumLoading: isLoading,
	};
};
