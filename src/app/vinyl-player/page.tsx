import { Suspense } from 'react';

import { VinylPlayer } from './lib/player';

export default function Page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<VinylPlayer />
		</Suspense>
	);
}
