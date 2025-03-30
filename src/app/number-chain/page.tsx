import { Suspense } from 'react';

import { NumberChainGame } from './lib/game';

// import { PhysicsTypeGame } from './lib/game';

export const NumberChainModule = {
	name: 'Number Chain',
	path: '/number-chain',
};

export default function Page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<NumberChainGame />
		</Suspense>
	);
}
