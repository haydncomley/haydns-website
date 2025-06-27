import { createContext, use } from 'react';

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

	const addClip = (newClip: Clip, index?: number) => {
		if (typeof index === 'number') {
			const newClips = [...clips];
			newClips.splice(index, 0, newClip);
			return newClips;
		} else {
			return setClips([...clips, newClip]);
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
		setClips(newClips);
	};

	return { clips, addClip, removeClip };
};
