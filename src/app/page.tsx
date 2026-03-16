import { Suspense } from 'react';

import { Spinner } from '~/components/spinner';

import { HomePage } from './home-page';

export default function Page() {
	return (
		<Suspense fallback={<Spinner />}>
			<HomePage />
		</Suspense>
	);
}
