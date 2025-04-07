'use client';

import { Album } from './lib/album';
import { usePlaylists } from './lib/use-playlists';

export const VinylPlayer = () => {
	const { playlists } = usePlaylists();

	return (
		<div>
			<div className="grid grid-cols-3 p-4 gap-4 md:gap-6 w-full overflow-auto md:grid-cols-4 md:max-w-2xl md:mx-auto">
				{playlists.map((playlist) => (
					<Album
						key={playlist.id}
						playlist={playlist}
					/>
				))}
			</div>
		</div>
	);
};
