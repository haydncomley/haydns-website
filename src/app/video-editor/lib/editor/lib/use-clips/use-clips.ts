import { createContext, use } from 'react';

import { PlaybackContext } from '../use-playback';

export type Clip = {
	id: string;
	name: string;
	length: number;
	source: string;
	loading?: boolean;
	thumbnail?: string;
};

export const ClipsContext = createContext<{
	clips: Clip[];
	setClips: (clips: Clip[]) => void;
}>({
	clips: [],
	setClips: () => undefined,
});

export const useClips = () => {
	const { clips, setClips } = use(ClipsContext);
	const { setTotalTime } = use(PlaybackContext);

	const addClip = (newClip: Clip, index?: number) => {
		if (typeof index === 'number') {
			const newClips = [...clips];
			newClips.splice(index, 0, newClip);
			setTotalTime(newClips.reduce((acc, clip) => acc + clip.length, 0));
			return newClips;
		} else {
			const newClips = [...clips, newClip];
			setTotalTime(newClips.reduce((acc, clip) => acc + clip.length, 0));
			return setClips(newClips);
		}
	};

	const removeClip = (clip: number | Clip) => {
		const newClips = [...clips];
		newClips.splice(
			typeof clip === 'number'
				? clip
				: clips.findIndex((c) => c.id === clip.id),
			1,
		);
		setTotalTime(newClips.reduce((acc, clip) => acc + clip.length, 0));
		setClips(newClips);
	};

	return { clips, addClip, removeClip };
};
