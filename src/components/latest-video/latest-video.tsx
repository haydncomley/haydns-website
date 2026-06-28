'use client';

import classNames from 'classnames';
import { X } from 'lucide-react';
import { useState } from 'react';

import {
	LATEST_VIDEO_COOKIE_MAX_AGE,
	LATEST_VIDEO_COOKIE_NAME,
	type LatestVideo as LatestVideoType,
} from '~/lib/youtube';

import styles from './latest-video.module.css';

type LatestVideoProps = {
	video: LatestVideoType;
	initiallyDismissed: boolean;
};

export const LatestVideo = ({
	video,
	initiallyDismissed,
}: LatestVideoProps) => {
	const [isDismissed, setIsDismissed] = useState(initiallyDismissed);

	const handleDismiss = (event: React.MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		document.cookie = `${LATEST_VIDEO_COOKIE_NAME}=1; path=/; max-age=${LATEST_VIDEO_COOKIE_MAX_AGE}; SameSite=Lax`;
		setIsDismissed(true);
	};

	if (isDismissed) {
		return null;
	}

	return (
		<div
			className={classNames(
				// Desktop only — tilted card popping off the right side of the page.
				'group absolute top-72 -right-4 z-40 hidden w-80 origin-right rotate-2 transition-transform hover:scale-105 lg:block',
				styles.swingIn,
			)}
		>
			<a
				href={video.url}
				target="_blank"
				rel="noreferrer"
				className="bg-background text-foreground border-foreground/15 flex flex-col gap-2 rounded-xl border p-3 pr-12 shadow-lg"
			>
				<div className="relative aspect-video w-full overflow-hidden rounded-md shadow-md">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={video.thumbnailUrl}
						alt={video.title}
						className="h-full w-full object-cover"
						loading="lazy"
					/>
				</div>

				<p className="line-clamp-2 flex flex-col text-sm leading-tight font-bold">
					<small className="mb-1 text-xs font-normal">
						Watch my latest YouTube video
					</small>
					{video.title}
				</p>
			</a>

			<button
				type="button"
				aria-label="Hide latest video"
				onClick={handleDismiss}
				className="bg-foreground text-background border-background absolute -top-3 right-6 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-2 transition-transform hover:scale-120 hover:rotate-12 active:scale-95"
			>
				<X className="h-4 w-4" />
			</button>
		</div>
	);
};
