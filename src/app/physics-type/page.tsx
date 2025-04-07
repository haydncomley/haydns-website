import { Suspense } from 'react';

import { PhysicsTypeGame } from './lib/game';

export default function Page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<PhysicsTypeGame />
		</Suspense>
	);
}
