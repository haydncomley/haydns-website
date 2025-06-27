import classNames from 'classnames';
import type { PropsWithChildren } from 'react';

import { useClips } from '../use-clips';
import { usePlayback } from '../use-playback';
import { TimelineClip } from './lib/timeline-clip';

export type TimelineProps = PropsWithChildren<{}>;

export const Timeline = ({ children }: TimelineProps) => {
	const { clips, addClip } = useClips();
	const { isPlaying } = usePlayback();

	const askForFile = async () => {
		const tempInput = document.createElement('input');
		tempInput.type = 'file';
		tempInput.multiple = false;
		tempInput.click();
		const abortController = new AbortController();
		const signal = abortController.signal;
		tempInput.addEventListener(
			'input',
			() => {
				let clipId = clips.length;
				tempInput.remove();
				if (!tempInput.files) return;
				Array.from(tempInput.files).map((file) => {
					const newClipId = `id-${clipId++}`;
					const sourceUrl = URL.createObjectURL(file);
					const video = document.createElement('video');
					video.src = sourceUrl;
					video.addEventListener(
						'loadeddata',
						() => {
							addClip({
								id: newClipId,
								length: video.duration * 1000,
								name: file.name,
								source: sourceUrl,
								loading: false,
							});
							video.remove();
						},
						{ signal },
					);
				});
			},
			{ signal },
		);
	};

	return (
		<div
			className={classNames('flex h-full w-full overflow-auto bg-gray-200', {
				'border-2 border-red-500': isPlaying,
			})}
		>
			{clips.map((clip) => (
				<TimelineClip
					key={clip.id}
					details={clip}
				/>
			))}
			<button onClick={askForFile}>Add Clip</button>
		</div>
	);
};

Timeline.Clip = TimelineClip;
