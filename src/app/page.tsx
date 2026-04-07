import { getSelectedFilters, type PageSearchParams } from '~/lib/search-params';

import { HomePage } from './home-page';

type PageProps = {
	searchParams: Promise<PageSearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
	const params = await searchParams;
	return <HomePage initialActiveFilters={getSelectedFilters(params.filter)} />;
}
