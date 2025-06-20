import { Suspense } from 'react';

import { Spinner } from '~/components/spinner';

import { NumberChainGame } from './lib/game';

export default function Page() {
	return (
		<Suspense fallback={<Spinner />}>
			<NumberChainGame />
		</Suspense>
	);
}
