import { Suspense } from 'react';

import { NumberChainGame } from './lib/game';

export default function Page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<NumberChainGame />
		</Suspense>
	);
}
