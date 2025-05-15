import { useQuery } from '@tanstack/react-query';

import { useSpotify } from '../use-spotify';

export const usePlayer = () => {
	const { spotify } = useSpotify();

	const { data } = useQuery({
		queryKey: ['spotify', 'player', 'state'],
		enabled: !!spotify,
		queryFn: () => spotify?.player.getCurrentlyPlayingTrack(),
	});

	return data;
};
