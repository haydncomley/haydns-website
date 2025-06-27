import { useRef } from 'react';

import { useClip } from '../../../use-clip';
import { type Clip } from '../../../use-clips';
import { useCurrentClip } from '../../../use-current-clip';
import { usePlayback } from '../../../use-playback';

export type TimelineClipProps = {
	details: Clip;
};

export const TimelineClip = ({ details }: TimelineClipProps) => {
	const { move } = usePlayback();
	const { currentClip } = useCurrentClip();
	const { clipStart, clipPercentage } = useClip(details);
	const elementRef = useRef<HTMLDivElement>(null);

	return (
		<div
			className="relative bg-gradient-to-br from-blue-300 to-blue-400"
			ref={elementRef}
			onClick={(e) => {
				if (!elementRef.current) return;
				const bounds = elementRef.current.getBoundingClientRect();
				const clipClickedAt =
					(details.length * (e.clientX - bounds.x)) / bounds.width;
				move(clipStart + clipClickedAt);
			}}
			style={{
				width: `${details.length / 1000}rem`,
			}}
		>
			{currentClip?.id === details.id ? (
				<div
					className="absolute top-0 bottom-0 left-0 w-1 bg-green-400"
					style={{
						left: `${clipPercentage * 100}%`,
					}}
				></div>
			) : null}
			Clip {details.name}
		</div>
	);
};
