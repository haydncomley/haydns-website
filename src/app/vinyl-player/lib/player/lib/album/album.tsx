/* eslint-disable @next/next/no-img-element */
import type { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import classNames from 'classnames';
import { ArrowLeft, Loader2 } from 'lucide-react';
import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { getPrimaryColour } from '../get-primary-colour';
import styles from './album.module.css';
import { useAlbum } from '../use-album';

export type AlbumProps = {
	playlist: SimplifiedPlaylist;
	parentRef: RefObject<HTMLDivElement | null>;
	onDragChange: (isDragging: boolean) => void;
};

const formatDuration = (ms: number): string => {
	const totalSeconds = Math.floor(ms / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${minutes}m ${seconds}s`;
};

export const Album = ({ playlist, parentRef, onDragChange }: AlbumProps) => {
	const imgRef = useRef<HTMLImageElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const recordRef = useRef<HTMLDivElement>(null);
	const [colour, setColour] = useState<string>('#000000');
	const [isFocused, setIsFocused] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [isDragging, setIsDragging] = useState(false);

	const { album, isAlbumLoading } = useAlbum({
		playlistId: isFocused ? playlist.id : undefined,
	});

	useEffect(() => {
		if (!imgRef.current) return;
		const img = imgRef.current;
		getPrimaryColour(img).then(setColour);
	}, [imgRef.current]);

	const close = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsClosing(false);
			setIsFocused(false);
		}, 200);
	};

	useEffect(() => {
		if (!recordRef.current) return;
		let startX = 0;
		let startY = 0;
		let isDragging = false;

		const onDrag = (event: MouseEvent | TouchEvent) => {
			if (!isDragging || !recordRef.current) return;
			event.preventDefault();
			event.stopPropagation();

			let currentX =
				'clientX' in event ? event.clientX : event.touches[0].clientX;
			let currentY =
				'clientY' in event ? event.clientY : event.touches[0].clientY;

			recordRef.current.style.transform = `translate(${currentX - startX}px, ${currentY - startY}px)`;
		};

		const onDragStart = (event: MouseEvent | TouchEvent) => {
			if (isDragging || !recordRef.current) return;
			setIsDragging(true);
			onDragChange(true);
			isDragging = true;
			startX = 'clientX' in event ? event.clientX : event.touches[0].clientX;
			startY = 'clientY' in event ? event.clientY : event.touches[0].clientY;
			recordRef.current.style.transition = '';
		};

		const onDragEnd = () => {
			if (!recordRef.current) return;
			setIsDragging(false);
			onDragChange(false);
			isDragging = false;
			recordRef.current.style.transform = '';
			recordRef.current.style.transition = '0.2s ease';
		};

		const abortController = new AbortController();
		const { signal } = abortController;

		window.addEventListener(
			'keydown',
			(event) => {
				if (event.key === 'Escape' && isFocused) close();
			},
			{
				signal,
			},
		);

		recordRef.current.addEventListener('mousedown', onDragStart, {
			signal,
		});
		recordRef.current.addEventListener('touchstart', onDragStart, {
			signal,
		});
		window.addEventListener('mousemove', onDrag, {
			signal,
			passive: false,
		});
		window.addEventListener('touchmove', onDrag, {
			signal,
			passive: false,
		});
		window.addEventListener('mouseup', onDragEnd, {
			signal,
		});
		window.addEventListener('touchend', onDragEnd, {
			signal,
		});

		return () => abortController.abort();
	}, [recordRef.current, isFocused]);

	useEffect(() => {
		if (!buttonRef.current) return;

		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!buttonRef.current) return;
					buttonRef.current.style.opacity = entry.intersectionRatio.toString();
				});
			},
			{ root: null, threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] },
		);

		intersectionObserver.observe(buttonRef.current);

		return () => intersectionObserver.disconnect();
	}, [buttonRef]);

	return (
		<>
			<button
				ref={buttonRef}
				onClick={() => setIsFocused(!isFocused)}
				className="relative cursor-pointer overflow-hidden rounded-lg shadow-sm transition-all duration-150 hover:scale-110 hover:shadow-lg"
			>
				<img
					ref={imgRef}
					className="h-full w-full object-cover"
					src={playlist.images?.[0]?.url ?? 'https://placehold.co/300x300'}
					alt={playlist.name}
				/>
			</button>

			{isFocused && parentRef.current
				? createPortal(
						<div
							className={classNames(
								'fixed top-0 right-0 bottom-0 left-0 z-10 flex flex-col overflow-hidden bg-black/50 backdrop-blur-sm select-none',
								isClosing ? styles.fadeOut : styles.fadeIn,
							)}
						>
							<div
								className="absolute top-0 right-0 bottom-0 left-0 opacity-25"
								style={{
									background: `linear-gradient(to bottom, ${colour}, ${colour}00)`,
								}}
							></div>

							<button
								onClick={close}
								className={classNames(
									'absolute top-0 left-0 z-10 m-4 mr-auto cursor-pointer rounded-full border border-white/10 bg-white/20 p-2 backdrop-blur-md transition-all duration-100 hover:bg-white/30',
									styles.fadeIn,
								)}
								style={{
									animationDelay: '0.3s',
								}}
							>
								<ArrowLeft className="h-6 w-6 text-white"></ArrowLeft>
							</button>

							<article className="relative flex flex-1 flex-col gap-4 overflow-hidden p-4 pt-16 md:mx-auto md:w-md">
								<div className="relative z-10 aspect-square w-2/3 rounded-2xl p-2">
									<img
										className={classNames(
											'relative z-10 h-full w-full rounded-lg object-cover shadow-2xl md:w-sm',
											styles.recordCover,
										)}
										src={
											playlist.images?.[0]?.url ??
											'https://placehold.co/300x300'
										}
										alt={playlist.name}
									/>
									<div
										ref={recordRef}
										className="absolute top-0 left-0 aspect-square w-full"
									>
										<div
											className={classNames(
												'flex aspect-square w-full items-center justify-center rounded-full border-2 border-white/5 shadow-md',
												styles.record,
												{
													'cursor-grabbing': isDragging,
													'cursor-grab': !isDragging,
												},
											)}
										>
											<img
												className="pointer-events-none h-1/2 w-1/2 rounded-full object-cover"
												src={
													playlist.images?.[0]?.url ??
													'https://placehold.co/150x150'
												}
												alt={playlist.name}
											/>
											<span className="bg-background border-foreground/10 absolute h-2 w-2 rounded-full border"></span>
										</div>
									</div>
								</div>

								<h2
									className={classNames(
										'mt-4 mb-2 text-center text-2xl font-bold text-white',
										{
											'opacity-0': isDragging,
										},
									)}
								>
									{playlist.name || 'Untitled'}

									{playlist.description ? (
										<p className="text-center text-base font-normal">
											{playlist.description}
										</p>
									) : null}
								</h2>

								{!isAlbumLoading ? (
									<div
										className={classNames(
											'flex max-h-full flex-col gap-2 overflow-auto rounded-xl border border-white/10 bg-white/20 p-3 px-4 text-white backdrop-blur-lg transition-all',
											styles.fadeIn,
											{
												'opacity-0': isDragging,
											},
										)}
									>
										{album?.tracks.items.map(({ track }) => (
											<div
												className="flex items-center gap-2"
												key={track.id}
											>
												<div className="flex shrink-1 grow flex-col truncate">
													<p className="truncate text-sm">{track.name}</p>
													<small className="-mt-0.5 flex text-xs opacity-75">
														{track.artists.slice(0, 1).map((artist) => (
															<span key={artist.id}>{artist.name}</span>
														))}
													</small>
												</div>
												<p className="shrink-0 grow-0">
													{formatDuration(track.duration_ms)}
												</p>
											</div>
										))}
									</div>
								) : null}
							</article>
						</div>,
						parentRef.current,
					)
				: null}
		</>
	);
};
