const YOUTUBE_CHANNEL_ID = 'UCdTL8llaLEPQnwuYpdtANrg';
const YOUTUBE_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
const FEED_REVALIDATE_SECONDS = 60 * 60; // Re-fetch the feed at most once an hour.

export const LATEST_VIDEO_COOKIE_NAME = 'latest-video-dismissed';
export const LATEST_VIDEO_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export type LatestVideo = {
	id: string;
	title: string;
	url: string;
	thumbnailUrl: string;
};

const decodeXmlEntities = (value: string) =>
	value
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&apos;/g, "'");

const matchFirst = (source: string, pattern: RegExp): string | null => {
	const match = source.match(pattern);
	return match ? match[1] : null;
};

export const getLatestVideo = async (): Promise<LatestVideo | null> => {
	try {
		const response = await fetch(YOUTUBE_FEED_URL, {
			next: { revalidate: FEED_REVALIDATE_SECONDS },
		});

		if (!response.ok) {
			return null;
		}

		const xml = await response.text();
		const firstEntry = matchFirst(xml, /<entry>([\s\S]*?)<\/entry>/);

		if (!firstEntry) {
			return null;
		}

		const id = matchFirst(firstEntry, /<yt:videoId>([^<]+)<\/yt:videoId>/);
		const title = matchFirst(firstEntry, /<title>([\s\S]*?)<\/title>/);

		if (!id || !title) {
			return null;
		}

		return {
			id,
			title: decodeXmlEntities(title.trim()),
			url: `https://www.youtube.com/watch?v=${id}`,
			thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
		};
	} catch {
		return null;
	}
};
