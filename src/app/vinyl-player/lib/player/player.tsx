'use client';

import { useRef, useState } from 'react';

import { Album } from './lib/album';
import { Decks } from './lib/decks';
import { usePlaylists } from './lib/use-playlists';

export const VinylPlayer = () => {
	const parentRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const { playlists } = usePlaylists();

	return (
		<div ref={parentRef}>
			<div className="grid w-full grid-cols-3 gap-4 overflow-auto p-4 md:mx-auto md:max-w-2xl md:grid-cols-4 md:gap-6">
				{playlists.map((playlist) => (
					<Album
						key={playlist.id}
						playlist={playlist}
						parentRef={parentRef}
						onDragChange={setIsDragging}
					/>
				))}
			</div>
			<Decks isDragging={isDragging} />
		</div>
	);
};
