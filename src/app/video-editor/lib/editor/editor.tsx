'use client';

import { useState } from 'react';

import { Preview } from './lib/preview';
import { Timeline } from './lib/timeline';
import type { Clip } from './lib/use-clips';
import { ClipsContext } from './lib/use-clips';
import { PlaybackContext } from './lib/use-playback';

export const Editor = () => {
	const [clips, setClips] = useState<Clip[]>([]);

	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [totalTime, setTotalTime] = useState(0);
	const [playbackBegin, setPlaybackBegin] = useState<number>();

	return (
		<PlaybackContext
			value={{
				currentTime,
				setCurrentTime,
				totalTime,
				setTotalTime,
				isPlaying,
				setIsPlaying,
				playbackBegin,
				setPlaybackBegin,
			}}
		>
			<ClipsContext value={{ clips, setClips }}>
				<div className="flex h-full w-full flex-col overflow-hidden">
					<div className="flex w-full basis-5/6">
						Project Space
						<Preview />
					</div>
					<div className="flex w-full basis-1/6">
						<Timeline></Timeline>
					</div>
				</div>
			</ClipsContext>
		</PlaybackContext>
	);
};
