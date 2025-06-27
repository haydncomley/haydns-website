import { createContext, use } from 'react';

export const PlaybackContext = createContext<{
	currentTime: number;
	setCurrentTime: (timestamp: number) => void;
	totalTime: number;
	setTotalTime: (timestamp: number) => void;
	isPlaying: boolean;
	setIsPlaying: (isPlaying: boolean) => void;
	playbackBegin?: number;
	setPlaybackBegin: (timestamp?: number) => void;
}>({
	currentTime: 0,
	setCurrentTime: () => undefined,
	totalTime: 0,
	setTotalTime: () => undefined,
	isPlaying: false,
	setIsPlaying: () => undefined,
	setPlaybackBegin: () => undefined,
});

export const usePlayback = () => {
	const {
		currentTime,
		totalTime,
		isPlaying,
		setIsPlaying,
		setCurrentTime,
		setPlaybackBegin,
		playbackBegin,
	} = use(PlaybackContext);

	const play = () => {
		setIsPlaying(true);
		const now = performance.now();

		if (playbackBegin) {
			const delta = now - playbackBegin;
			setCurrentTime(currentTime + delta);
		}

		setPlaybackBegin(now);
	};

	const pause = () => {
		setIsPlaying(false);

		if (!playbackBegin) return 0;
		const delta = performance.now() - playbackBegin;
		setCurrentTime(currentTime + delta);
		setPlaybackBegin(undefined);
		return performance.now() - playbackBegin;
	};

	const stop = () => {
		setIsPlaying(false);
		setCurrentTime(0);

		if (!playbackBegin) return 0;
		setPlaybackBegin(undefined);
		return performance.now() - playbackBegin;
	};

	const move = (timestamp: number) => {
		setCurrentTime(timestamp);
		if (!isPlaying) setPlaybackBegin(undefined);
		else setPlaybackBegin(performance.now());
	};

	return {
		play,
		pause,
		stop,
		move,
		currentTime,
		totalTime,
		isPlaying,
	};
};
