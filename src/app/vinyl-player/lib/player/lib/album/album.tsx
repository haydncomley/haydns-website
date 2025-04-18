/* eslint-disable @next/next/no-img-element */
import type { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import classNames from 'classnames';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { getPrimaryColour } from '../get-primary-colour';
import styles from './album.module.css';
import { useAlbum } from '../use-album';

export type AlbumProps = {
	playlist: SimplifiedPlaylist;
};

const formatDuration = (ms: number): string => {
	const totalSeconds = Math.floor(ms / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${minutes}m ${seconds}s`;
};

export const Album = ({ playlist }: AlbumProps) => {
	const imgRef = useRef<HTMLImageElement>(null);
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
			isDragging = true;
			startX = 'clientX' in event ? event.clientX : event.touches[0].clientX;
			startY = 'clientY' in event ? event.clientY : event.touches[0].clientY;
			recordRef.current.style.transition = '';
		};

		const onDragEnd = () => {
			if (!recordRef.current) return;
			setIsDragging(false);
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

	return (
		<>
			<button
				onClick={() => setIsFocused(!isFocused)}
				className="relative rounded-lg overflow-hidden shadow-sm hover:scale-110 hover:shadow-lg transition-all duration-150 cursor-pointer"
			>
				<img
					ref={imgRef}
					className="w-full h-full object-cover"
					crossOrigin="anonymous"
					src={playlist.images?.[0]?.url ?? 'https://placehold.co/300x300'}
					alt={playlist.name}
				/>
			</button>

			{isFocused
				? createPortal(
						<div
							className={classNames(
								'fixed top-0 left-0 right-0 bottom-0 z-10 bg-black/50 backdrop-blur-sm flex flex-col p-2 select-none',
								isClosing ? styles.fadeOut : styles.fadeIn,
							)}
						>
							<div
								className="absolute top-0 left-0 right-0 bottom-0 opacity-25"
								style={{
									background: `linear-gradient(to bottom right, ${colour}, ${colour}00)`,
								}}
							></div>

							<button
								onClick={close}
								className={classNames(
									'relative rounded-full bg-white/20 p-2 mr-auto m-2 backdrop-blur-md border border-white/10',
									styles.fadeIn,
								)}
								style={{
									animationDelay: '0.3s',
								}}
							>
								<ArrowLeft className="w-6 h-6 text-white"></ArrowLeft>
							</button>

							<article className="relative flex flex-col gap-4 p-3 md:w-md md:mx-auto overflow-hidden flex-1">
								<div className="relative w-2/3 aspect-square rounded-2xl p-2">
									<img
										className={classNames(
											'relative w-full h-full object-cover z-10 shadow-2xl rounded-lg md:w-sm',
											styles.recordCover,
										)}
										crossOrigin="anonymous"
										src={
											playlist.images?.[0]?.url ??
											'https://placehold.co/300x300'
										}
										alt={playlist.name}
									/>
									<div
										ref={recordRef}
										className="absolute w-full aspect-square top-0 left-0"
									>
										<div
											className={classNames(
												'w-full aspect-square rounded-full border-2 border-white/5 flex items-center justify-center shadow-md',
												styles.record,
												{
													'cursor-grabbing': isDragging,
													'cursor-grab': !isDragging,
												},
											)}
										>
											<img
												className="object-cover rounded-full w-1/2 h-1/2 pointer-events-none"
												crossOrigin="anonymous"
												src={
													playlist.images?.[0]?.url ??
													'https://placehold.co/150x150'
												}
												alt={playlist.name}
											/>
											<span className="w-2 h-2 rounded-full absolute bg-background border border-foreground/10"></span>
										</div>
									</div>
								</div>

								<h2 className="text-2xl font-bold text-center mt-4 mb-2 text-white">
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
											'flex flex-col bg-white/20 backdrop-blur-lg p-3 px-4 rounded-xl border border-white/10 gap-2 text-white overflow-auto',
											styles.fadeIn,
										)}
									>
										{album?.tracks.items.map(({ track }) => (
											<div
												className="flex items-center gap-2"
												key={track.id}
											>
												<div className="grow shrink-1 flex flex-col truncate">
													<p className="text-sm truncate">{track.name}</p>
													<small className="flex opacity-75 text-xs -mt-0.5">
														{track.artists.slice(0, 1).map((artist) => (
															<span key={artist.id}>{artist.name}</span>
														))}
													</small>
												</div>
												<p className="grow-0 shrink-0">
													{formatDuration(track.duration_ms)}
												</p>
											</div>
										))}
									</div>
								) : null}
							</article>
						</div>,
						document.body,
					)
				: null}
		</>
	);
};
