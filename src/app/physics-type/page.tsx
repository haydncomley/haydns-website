import { Suspense } from 'react';

import { Spinner } from '~/components/spinner';

import { PhysicsTypeGame } from './lib/game';

export default function Page() {
	return (
		<Suspense fallback={<Spinner />}>
			<PhysicsTypeGame />
		</Suspense>
	);
}
