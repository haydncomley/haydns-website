import classNames from 'classnames';
import { Pause, Play, Plus } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import { useClips } from '../use-clips';
import { usePlayback } from '../use-playback';
import { TimelineClip } from './lib/timeline-clip';

export type TimelineProps = PropsWithChildren<{}>;

export const Timeline = ({ children }: TimelineProps) => {
	const { clips, addClip } = useClips();
	const { isPlaying, play, pause } = usePlayback();

	const askForFile = async () => {
		const tempInput = document.createElement('input');
		tempInput.type = 'file';
		tempInput.multiple = true;
		tempInput.click();
		tempInput.addEventListener('input', () => {
			let clipId = clips.length;
			tempInput.remove();
			if (!tempInput.files) return;
			Array.from(tempInput.files).forEach((file) => {
				const newClipId = `id-${clipId++}`;
				const sourceUrl = URL.createObjectURL(file);
				const video = document.createElement('video');
				video.src = sourceUrl;
				video.addEventListener('loadeddata', () => {
					addClip({
						id: newClipId,
						length: video.duration * 1000,
						name: file.name,
						source: sourceUrl,
						loading: false,
						raw: file,
					});
					video.remove();
				});
			});
		});
	};

	return (
		<div className="flex h-full w-full flex-col gap-2 px-4">
			<div className="flex items-center gap-2">
				<button
					onClick={() => (isPlaying ? pause() : play())}
					className={classNames(
						'flex cursor-pointer items-center justify-center rounded-md p-2 text-xl',
						{
							'bg-primary text-primary-foreground': !isPlaying,
							'bg-secondary text-secondary-foreground': isPlaying,
						},
					)}
				>
					{isPlaying ? (
						<Pause className="h-4 w-4" />
					) : (
						<Play className="h-4 w-4" />
					)}
				</button>

				<button
					onClick={askForFile}
					className="bg-foreground text-background flex cursor-pointer items-center justify-center rounded-md p-2 text-xl"
				>
					<Plus className="h-4 w-4" />
				</button>
			</div>

			<div className="border-foreground/25 bg-foreground/5 flex h-full w-full overflow-auto rounded-t-md border border-b-0">
				{clips.map((clip) => (
					<TimelineClip
						key={clip.id}
						details={clip}
					/>
				))}
			</div>
		</div>
	);
};

Timeline.Clip = TimelineClip;
