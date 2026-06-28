import { cookies } from 'next/headers';

import {
	getSelectedFilters,
	getSelectedProjectSlug,
	type PageSearchParams,
} from '~/lib/search-params';
import { getLatestVideo, LATEST_VIDEO_COOKIE_NAME } from '~/lib/youtube';

import { HomePage } from './home-page';

type PageProps = {
	searchParams: Promise<PageSearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
	const [params, latestVideo, cookieStore] = await Promise.all([
		searchParams,
		getLatestVideo(),
		cookies(),
	]);

	const isLatestVideoDismissed =
		cookieStore.get(LATEST_VIDEO_COOKIE_NAME)?.value === '1';

	return (
		<HomePage
			initialActiveFilters={getSelectedFilters(params.filter)}
			initialSelectedProjectSlug={getSelectedProjectSlug(params.project)}
			latestVideo={latestVideo}
			isLatestVideoDismissed={isLatestVideoDismissed}
		/>
	);
}
