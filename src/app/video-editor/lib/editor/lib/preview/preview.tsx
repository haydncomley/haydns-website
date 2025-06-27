import { useEffect, useMemo, useRef } from 'react';

import { useCurrentClip } from '../use-current-clip';
import { usePlayback } from '../use-playback';

export const Preview = () => {
	const videoRef = useRef<HTMLVideoElement>(null);

	const { currentTime, isPlaying, play, pause, stop, move } = usePlayback();
	const { currentClip } = useCurrentClip();

	useEffect(() => {
		if (!videoRef.current || !currentClip) return;
		videoRef.current.src = currentClip.source;
	}, [currentClip?.id]);

	useEffect(() => {
		if (!videoRef.current) return;
		videoRef.current.currentTime = currentTime / 1000;
	}, [currentTime]);

	useEffect(() => {
		if (!videoRef.current) return;
		if (isPlaying) videoRef.current.play();
		else videoRef.current.pause();

		const onEnd = () => {
			play();
		};

		videoRef.current.addEventListener('ended', onEnd);
	}, [isPlaying, currentTime]);

	return (
		<div>
			<div className="aspect-video w-sm bg-gray-300">
				<video
					ref={videoRef}
					className="h-full w-full bg-black"
					playsInline
					autoPlay={isPlaying}
					muted
				></video>
				<p>{currentClip?.name ?? 'No Clip'}</p>
				<p>Current Time: {currentTime / 1000}s</p>
			</div>
			<div className="flex gap-1 p-1">
				<button onClick={stop}>Stop</button>
				{!isPlaying ? (
					<button onClick={play}>Play</button>
				) : (
					<button onClick={pause}>Pause</button>
				)}
			</div>
		</div>
	);
};
