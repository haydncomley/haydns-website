import { Suspense } from 'react';

import { Spinner } from '~/components/spinner';

import { Editor } from './lib/editor';

export default function Page() {
	return (
		<Suspense fallback={<Spinner />}>
			<Editor />
		</Suspense>
	);
}
