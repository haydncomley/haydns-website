import { Suspense } from 'react';

import { Spinner } from '~/components/spinner';

import { VinylPlayer } from './lib/player';

export default function Page() {
	return (
		<Suspense fallback={<Spinner />}>
			<VinylPlayer />
		</Suspense>
	);
}
