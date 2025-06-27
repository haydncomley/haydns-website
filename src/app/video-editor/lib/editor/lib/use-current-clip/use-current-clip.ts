import { useMemo } from 'react';

import { useClip } from '../use-clip';
import type { Clip } from '../use-clips';
import { useClips } from '../use-clips';
import { usePlayback } from '../use-playback';

export const useCurrentClip = () => {
	const { clips } = useClips();
	const { currentTime } = usePlayback();

	const currentClip = useMemo<Clip | undefined>(() => {
		let time = 0;
		return clips.find((c) => {
			time += c.length;
			return currentTime < time;
		});
	}, [clips.map((clip) => clip.length).join(), currentTime]);

	const { clip, clipDelta, clipPercentage, clipStart } = useClip(currentClip);

	return {
		currentClip: clip,
		currentClipData: clipDelta,
		currentClipClipPercentage: clipPercentage,
		currentClipClipStart: clipStart,
	};
};
