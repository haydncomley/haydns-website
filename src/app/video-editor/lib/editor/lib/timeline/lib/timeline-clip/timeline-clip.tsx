import classNames from 'classnames';
import { useEffect, useRef } from 'react';

import { useClip } from '../../../use-clip';
import { type Clip } from '../../../use-clips';
import { useCurrentClip } from '../../../use-current-clip';
import { usePlayback } from '../../../use-playback';

export type TimelineClipProps = {
	details: Clip;
};

export const TimelineClip = ({ details }: TimelineClipProps) => {
	const { move, isPlaying } = usePlayback();
	const { currentClip } = useCurrentClip();
	const { clipStart, clipPercentage, clipDelta } = useClip(details);
	const elementRef = useRef<HTMLDivElement>(null);
	const tickerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!elementRef.current) return;

		const abortController = new AbortController();
		const signal = abortController.signal;
		let isDown = false;

		const doScrub = (e: MouseEvent) => {
			if (!elementRef.current) return;
			const bounds = elementRef.current.getBoundingClientRect();
			const clipClickedAt =
				(details.length * (e.clientX - bounds.x)) / bounds.width;
			move(clipStart + clipClickedAt);
		};

		const handleDown = (e: MouseEvent) => {
			isDown = true;
			e.preventDefault();
			doScrub(e);
		};

		const handleUp = () => {
			isDown = false;
		};

		const handleMove = (e: MouseEvent) => {
			if (!isDown) return;
			e.preventDefault();
			doScrub(e);
		};

		elementRef.current.addEventListener('mousedown', handleDown, { signal });
		window.addEventListener('mouseup', handleUp, { signal });
		window.addEventListener('mouseleave', handleUp, { signal });
		elementRef.current.addEventListener('mousemove', handleMove, {
			signal,
			passive: false,
		});

		return () => {
			abortController.abort();
		};
	}, [!!!elementRef.current]);

	useEffect(() => {
		if (!tickerRef.current) return;
		if (currentClip?.id !== details.id) {
			tickerRef.current.style.left = '0%';
			return;
		}

		if (!isPlaying) {
			tickerRef.current.style.left = `${clipPercentage * 100}%`;
			return;
		}

		const startedAt = performance.now();

		const updateTicker = () => {
			if (!tickerRef.current) return;
			const delta = performance.now() - startedAt;
			const clipCurrent = clipDelta + delta;
			const clipCurrentPercentage = clipCurrent / details.length;
			tickerRef.current.style.left = `${clipCurrentPercentage * 100}%`;
		};

		updateTicker();
		const interval = setInterval(updateTicker, 100);

		return () => {
			clearInterval(interval);
		};
	}, [clipPercentage, clipDelta, isPlaying, currentClip?.id]);

	return (
		<div
			className="border-foreground/10 even:bg-foreground/5 relative shrink-0 border-r"
			ref={elementRef}
			style={{
				width: `${(details.length / 1000) * 2}rem`,
			}}
		>
			{currentClip?.id === details.id ? (
				<div
					ref={tickerRef}
					className={classNames(
						'pointer-events-none absolute top-0 bottom-0 left-0 w-0.5 -translate-x-1/2 transition-all duration-100 ease-linear',
						{
							'bg-primary': !isPlaying,
							'bg-secondary': isPlaying,
						},
					)}
				></div>
			) : null}
			<div className="truncate p-2 whitespace-nowrap">Clip {details.name}</div>
		</div>
	);
};
