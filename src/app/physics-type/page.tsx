import { Suspense } from 'react';

import { PhysicsTypeGame } from './lib/physics-type';

export const PhysicsTypeModule = {
	name: 'Physics Type',
	path: '/physics-type',
};

export default function Page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<PhysicsTypeGame />
		</Suspense>
	);
}
