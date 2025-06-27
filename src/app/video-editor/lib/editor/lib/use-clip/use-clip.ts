import { useMemo, useState } from 'react';

import type { Clip } from '../use-clips';
import { useClips } from '../use-clips';
import { usePlayback } from '../use-playback';

export const useClip = (clip?: Clip) => {
	const { clips } = useClips();
	const { currentTime } = usePlayback();

	const clipStart = useMemo(() => {
		if (!clip) return 0;
		let time = 0;
		for (const c of clips) {
			if (c.id === clip.id) break;
			time += c.length;
		}

		return time;
	}, [clip?.id, clips.map((c) => c.length).join()]);

	const clipDelta = Math.min(
		clip?.length ?? 0,
		Math.max(currentTime - clipStart, 0),
	);
	const clipPercentage = clip?.length ? clipDelta / clip.length : 0;

	return {
		clip,
		clipStart,
		clipDelta,
		clipPercentage,
	};
};
