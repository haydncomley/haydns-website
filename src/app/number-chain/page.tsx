import {
	getNumberChainQueryState,
	type PageSearchParams,
} from '~/lib/search-params';

import { NumberChainGame } from './lib/game';

type PageProps = {
	searchParams: Promise<PageSearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
	const params = await searchParams;
	const { currentLevel, viewingAllLevels } = getNumberChainQueryState(params);

	return (
		<NumberChainGame
			currentLevel={currentLevel}
			viewingAllLevels={viewingAllLevels}
		/>
	);
}
