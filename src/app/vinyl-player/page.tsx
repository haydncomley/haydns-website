import { Suspense } from 'react';

import { VinylPlayer } from './lib/player';

export const VinylPlayerModule = {
	name: 'Vinyl Player',
	path: '/vinyl-player',
};

export default function Page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<VinylPlayer />
		</Suspense>
	);
}
