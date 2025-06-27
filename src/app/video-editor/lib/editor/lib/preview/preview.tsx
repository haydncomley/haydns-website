import { useEffect, useMemo, useRef } from 'react';

import { useClips } from '../use-clips';
import { useCurrentClip } from '../use-current-clip';
import { usePlayback } from '../use-playback';

export const Preview = () => {
	const videoRef = useRef<HTMLVideoElement>(null);

	const { clips } = useClips();
	const { currentTime, totalTime, isPlaying, play, pause, stop, move } =
		usePlayback();
	const { currentClip, currentClipStart } = useCurrentClip();

	useEffect(() => {
		if (!videoRef.current || !currentClip) return;
		videoRef.current.src = currentClip.source;
	}, [currentClip?.id]);

	useEffect(() => {
		if (!videoRef.current) return;
		videoRef.current.currentTime = (currentTime - currentClipStart) / 1000;
	}, [currentTime]);

	useEffect(() => {
		if (!videoRef.current) return;
		if (isPlaying) videoRef.current.play();
		else videoRef.current.pause();

		const onEnd = () => {
			const isLastClip = currentClip === clips[clips.length - 1];
			if (isPlaying && currentClip && !isLastClip) {
				move(currentClip.length + currentClipStart);
			} else {
				stop();
			}
		};

		videoRef.current.addEventListener('ended', onEnd);

		return () => {
			videoRef.current?.removeEventListener('ended', onEnd);
		};
	}, [isPlaying, currentTime]);

	return (
		<div className="flex w-full flex-col items-center justify-center gap-4">
			<div className="aspect-video w-1/2 overflow-hidden rounded-md bg-gray-300 shadow-md">
				<video
					ref={videoRef}
					className="h-full w-full bg-black"
					playsInline
					autoPlay={isPlaying}
					muted
				></video>
			</div>

			<div className="flex flex-col items-center gap-2">
				<div className="flex gap-2">
					<input
						id="project-name"
						className="border-foreground/25 bg-foreground/5 w-full rounded-md border p-2"
						placeholder="Project Name"
					/>
					<input
						id="resolution"
						className="border-foreground/25 bg-foreground/5 w-[8rem] rounded-md border p-2 text-center"
						placeholder="1280x720"
					/>
					<input
						id="total-time"
						className="border-foreground/25 bg-foreground/5 w-[8rem] cursor-not-allowed rounded-md border p-2 text-center"
						placeholder={`${(totalTime / 1000).toFixed(2)}s`}
						disabled
					/>
				</div>
			</div>
		</div>
	);
};
