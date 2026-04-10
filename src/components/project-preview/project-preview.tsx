'use client';

import classNames from 'classnames';
import {
	ArrowRight,
	ChevronLeft,
	ChevronRight,
	ExternalLink,
	X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import type { Project, ProjectGalleryItem } from '~/lib/types';

export type ProjectPreviewProps = {
	project: Project;
	onClose: () => void;
};

const getWrappedIndex = (index: number, count: number) => {
	if (count === 0) {
		return 0;
	}

	return ((index % count) + count) % count;
};

const getRelativeCarouselPosition = (
	index: number,
	activeIndex: number,
	count: number,
) => {
	if (count <= 1) {
		return 0;
	}

	const forwardDistance = getWrappedIndex(index - activeIndex, count);
	const backwardDistance = forwardDistance - count;

	return Math.abs(backwardDistance) < Math.abs(forwardDistance)
		? backwardDistance
		: forwardDistance;
};

const getMediaItemLabel = (
	mediaItem: ProjectGalleryItem,
	projectName: string,
	index: number,
) => {
	if (mediaItem.type === 'image') {
		return mediaItem.alt;
	}

	return (
		mediaItem.title ??
		mediaItem.caption ??
		`${projectName} preview ${index + 1}`
	);
};

const renderMediaItem = ({
	mediaItem,
	label,
	isActive,
	isThumbnail = false,
}: {
	mediaItem: ProjectGalleryItem;
	label: string;
	isActive: boolean;
	isThumbnail?: boolean;
}) => {
	if (mediaItem.type === 'image') {
		return (
			<Image
				src={mediaItem.src}
				alt={label}
				fill
				className={classNames({
					'max-h-full max-w-full object-contain': !isThumbnail,
					'h-full w-full object-cover': isThumbnail,
				})}
				draggable={false}
			/>
		);
	}

	return (
		<video
			src={mediaItem.src}
			poster={mediaItem.poster}
			className={classNames({
				'bg-background/80 max-h-full max-w-full rounded-4xl object-contain':
					!isThumbnail,
				'h-full w-full object-cover': isThumbnail,
			})}
			muted={isThumbnail}
			playsInline
			controls={isActive && !isThumbnail}
			preload="metadata"
			tabIndex={isActive && !isThumbnail ? 0 : -1}
		/>
	);
};

export const ProjectPreview = ({ project, onClose }: ProjectPreviewProps) => {
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const wheelLockTimeoutRef = useRef<number | null>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);

	const previewMedia =
		project.gallery.length > 0
			? project.gallery
			: [
					{
						type: 'video' as const,
						src: project.previewVideoSrc,
						title: `${project.name} preview`,
					},
				];

	const goToIndex = (index: number) => {
		setActiveIndex(getWrappedIndex(index, previewMedia.length));
	};

	const goToPrevious = () => {
		goToIndex(activeIndex - 1);
	};

	const goToNext = () => {
		goToIndex(activeIndex + 1);
	};

	useEffect(() => {
		closeButtonRef.current?.focus();

		const fadeTimeout = window.setTimeout(() => {
			setIsVisible(true);
		}, 10);

		return () => {
			window.clearTimeout(fadeTimeout);
		};
	}, []);

	useEffect(() => {
		const abortController = new AbortController();

		window.addEventListener(
			'keydown',
			(event) => {
				if (event.key === 'Escape') {
					onClose();
					return;
				}
			},
			{ signal: abortController.signal },
		);

		return () => abortController.abort();
	}, [onClose]);

	useEffect(() => {
		const previousBodyOverflow = document.body.style.overflow;
		const previousBodyPaddingRight = document.body.style.paddingRight;
		const scrollbarWidth =
			window.innerWidth - document.documentElement.clientWidth;

		document.body.style.overflow = 'hidden';

		if (scrollbarWidth > 0) {
			document.body.style.paddingRight = `${scrollbarWidth}px`;
		}

		return () => {
			if (wheelLockTimeoutRef.current) {
				window.clearTimeout(wheelLockTimeoutRef.current);
			}

			document.body.style.overflow = previousBodyOverflow;
			document.body.style.paddingRight = previousBodyPaddingRight;
		};
	}, []);

	return createPortal(
		<div
			className="fixed inset-0 z-100"
			style={
				{
					'--accent': project.primaryColor,
					'--accent-contrast': project.secondaryColor,
				} as React.CSSProperties
			}
		>
			<button
				type="button"
				onClick={onClose}
				aria-label={`Close ${project.name} preview`}
				className={classNames(
					'bg-background/65 absolute inset-0 h-full w-full backdrop-blur-md transition-opacity',
					{
						'opacity-100': isVisible,
						'opacity-0': !isVisible,
					},
				)}
			/>

			<button
				ref={closeButtonRef}
				type="button"
				onClick={onClose}
				className={classNames(
					'bg-background text-foreground dark:bg-foreground dark:text-background border-foreground/25 fixed top-8 right-8 z-50 flex cursor-pointer items-center gap-2 rounded-full border p-2 text-sm transition-all hover:scale-110 hover:rotate-12 active:scale-95',
				)}
			>
				<X className="h-6 w-6" />
			</button>

			<div className="relative h-full w-full">
				<div className="m-auto flex h-full w-full max-w-6xl flex-col items-center justify-center gap-6 md:px-0 md:py-12">
					<div className="flex w-full flex-col items-center gap-6">
						<div className="relative aspect-square max-h-[70vh] w-full overflow-hidden select-none max-md:-translate-y-12 md:aspect-3/2 md:max-h-[50vh]">
							{previewMedia.map((mediaItem, index) => {
								const relativePosition = getRelativeCarouselPosition(
									index,
									activeIndex,
									previewMedia.length,
								);
								const visibilityDistance = Math.abs(relativePosition);
								const isPanelVisible = visibilityDistance <= 1.25;
								const prominence = Math.max(
									0,
									1 - Math.min(visibilityDistance, 1),
								);
								const scale = 0.68 + prominence * 0.32;
								const opacity = 0.2 + prominence * 0.8;
								const width = `${40 + prominence * 40}%`;
								const zIndex = 10 + Math.round(prominence * 10);
								const isActive = index === activeIndex;
								const mediaLabel = getMediaItemLabel(
									mediaItem,
									project.name,
									index,
								);

								return (
									<div
										key={`${mediaItem.type}-${mediaItem.src}-${index}`}
										className={classNames(
											'absolute top-1/2 left-1/2 flex aspect-square max-h-full items-center justify-center transition-[transform,opacity,width,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:aspect-3/2 md:max-h-[50vh]',
											{
												'pointer-events-none': !isActive,
												invisible: !isPanelVisible,
											},
										)}
										style={{
											width,
											opacity,
											zIndex,
											filter: `saturate(${0.7 + prominence * 0.3})`,
											transform: `translate(calc(-50% + ${relativePosition * 86}%), -50%) scale(${scale})`,
											willChange: 'transform, opacity, width',
										}}
									>
										<div className="relative flex h-full w-full items-center justify-center overflow-hidden">
											{renderMediaItem({
												mediaItem,
												label: mediaLabel,
												isActive,
											})}
										</div>
									</div>
								);
							})}

							{previewMedia.length > 1 ? (
								<>
									<button
										type="button"
										onClick={goToPrevious}
										aria-label="Show previous preview"
										className="bg-foreground text-background absolute top-1/2 left-4 z-30 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95"
									>
										<ChevronLeft className="pointer-events-none h-6 w-6" />
									</button>
									<button
										type="button"
										onClick={goToNext}
										aria-label="Show next preview"
										className="bg-foreground text-background absolute top-1/2 right-4 z-30 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95"
									>
										<ChevronRight className="pointer-events-none h-6 w-6" />
									</button>
								</>
							) : null}
						</div>

						<div className="flex w-full max-w-3xl items-center justify-center gap-3 overflow-x-auto px-2 py-1 max-md:-translate-y-12 md:px-0">
							{previewMedia.map((mediaItem, index) => {
								const isActive = index === activeIndex;
								const mediaLabel = getMediaItemLabel(
									mediaItem,
									project.name,
									index,
								);

								return (
									<button
										key={`thumbnail-${mediaItem.type}-${mediaItem.src}-${index}`}
										type="button"
										onClick={() => goToIndex(index)}
										aria-label={`Show ${mediaLabel}`}
										aria-pressed={isActive}
										className={classNames(
											'group relative shrink-0 cursor-pointer overflow-hidden rounded-[1.4rem] transition-all duration-300 ease-out',
											{
												'ring-primary w-14 ring-3 md:w-20': isActive,
												'w-12 opacity-65 hover:opacity-100 md:w-16': !isActive,
											},
										)}
									>
										<div className="relative aspect-square overflow-hidden rounded-[1.4rem] bg-black/10">
											{renderMediaItem({
												mediaItem,
												label: mediaLabel,
												isActive,
												isThumbnail: true,
											})}
										</div>
										<div className="from-background/10 to-background/55 absolute inset-0 bg-gradient-to-t" />
									</button>
								);
							})}
						</div>

						<Link
							className={classNames(
								'relative z-10 transition-transform duration-200 ease-out max-md:fixed max-md:bottom-4',
							)}
							target="_blank"
							href={project.path}
							style={
								{
									'--background': project.secondaryColor,
									'--foreground': project.primaryColor,
								} as React.CSSProperties
							}
						>
							<div
								className={classNames(
									'flex items-center gap-8 rounded-4xl bg-(--background) px-6 py-4 pr-4 text-(--foreground) shadow-md transition-all group-hover:scale-105 group-hover:shadow-xl md:mt-8 md:translate-x-2',
								)}
							>
								<div className="flex flex-col gap-0.5">
									<h4 className="leading-none font-bold">{project.name}</h4>
									<p className="max-w-[12.5rem] overflow-hidden text-sm leading-none font-normal overflow-ellipsis whitespace-nowrap">
										{project.prettyPath.map((part, i) => (
											<span
												className="first:opacity-75"
												key={i}
											>
												{part}
											</span>
										))}
									</p>
								</div>

								<span
									className={classNames(
										'rounded-full bg-(--foreground) p-3 text-(--background) transition-all group-hover:scale-110',
									)}
								>
									<ExternalLink className="h-4 w-4" />
								</span>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>,
		document.body,
	);
};
