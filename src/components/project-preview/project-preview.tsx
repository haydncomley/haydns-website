'use client';

import classNames from 'classnames';
import { ExternalLink, X } from 'lucide-react';
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

type MediaProps = {
	mediaItem: ProjectGalleryItem;
	label: string;
	isEnlarged?: boolean;
};

const GalleryMedia = ({ mediaItem, label, isEnlarged = false }: MediaProps) => {
	const [ratio, setRatio] = useState<number>(16 / 9);

	const containerStyle: React.CSSProperties = isEnlarged
		? {
				aspectRatio: ratio,
				width: `min(calc(100vw - 2rem), calc((100vh - 2rem) * ${ratio}))`,
			}
		: {
				aspectRatio: ratio,
				width: `min(100%, calc(70vh * ${ratio}))`,
			};

	const containerClassName = classNames(
		'relative mx-auto overflow-hidden',
		isEnlarged
			? 'max-h-[calc(100vh-2rem)]'
			: 'bg-foreground/5 max-h-[70vh] rounded-3xl shadow-md ring-1 ring-foreground/10 transition-all duration-300 ease-out group-hover:scale-[1.01] group-hover:shadow-xl group-active:scale-[0.99]',
	);

	if (mediaItem.type === 'image') {
		return (
			<div
				className={containerClassName}
				style={containerStyle}
			>
				<Image
					src={mediaItem.src}
					alt={label}
					fill
					sizes={isEnlarged ? '100vw' : '(max-width: 768px) 100vw, 720px'}
					className="object-contain"
					draggable={false}
					onLoad={(event) => {
						const img = event.currentTarget;
						if (img.naturalWidth && img.naturalHeight) {
							setRatio(img.naturalWidth / img.naturalHeight);
						}
					}}
				/>
			</div>
		);
	}

	return (
		<div
			className={containerClassName}
			style={containerStyle}
		>
			<video
				src={mediaItem.src}
				poster={mediaItem.poster}
				className="absolute inset-0 h-full w-full object-contain"
				muted={!isEnlarged}
				autoPlay={!isEnlarged}
				loop={!isEnlarged}
				playsInline
				controls={isEnlarged}
				preload="metadata"
				onLoadedMetadata={(event) => {
					const video = event.currentTarget;
					if (video.videoWidth && video.videoHeight) {
						setRatio(video.videoWidth / video.videoHeight);
					}
				}}
			/>
		</div>
	);
};

export const ProjectPreview = ({ project, onClose }: ProjectPreviewProps) => {
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [enlargedIndex, setEnlargedIndex] = useState<number | null>(null);

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

	const enlargedItem =
		enlargedIndex !== null ? previewMedia[enlargedIndex] : null;

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
					if (enlargedIndex !== null) {
						setEnlargedIndex(null);
					} else {
						onClose();
					}
				}
			},
			{ signal: abortController.signal },
		);

		return () => abortController.abort();
	}, [enlargedIndex, onClose]);

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
			<div
				className={classNames(
					'bg-background/65 absolute inset-0 h-full w-full overflow-y-auto overscroll-contain backdrop-blur-md transition-opacity duration-300',
					{
						'opacity-100': isVisible,
						'opacity-0': !isVisible,
					},
				)}
				onClick={(event) => {
					if (event.target === event.currentTarget) {
						onClose();
					}
				}}
			>
				<div
					className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 pt-20 pb-40 md:gap-6 md:px-6 md:pt-24 md:pb-48"
					onClick={(event) => {
						if (event.target === event.currentTarget) {
							onClose();
						}
					}}
				>
					{previewMedia.map((mediaItem, index) => {
						const mediaLabel = getMediaItemLabel(
							mediaItem,
							project.name,
							index,
						);

						return (
							<button
								key={`${mediaItem.type}-${mediaItem.src}-${index}`}
								type="button"
								onClick={() => setEnlargedIndex(index)}
								aria-label={`Enlarge ${mediaLabel}`}
								className="group relative block w-full cursor-zoom-in"
							>
								<GalleryMedia
									mediaItem={mediaItem}
									label={mediaLabel}
								/>
							</button>
						);
					})}
				</div>
			</div>

			<button
				ref={closeButtonRef}
				type="button"
				onClick={onClose}
				aria-label={`Close ${project.name} preview`}
				className="bg-background text-foreground dark:bg-foreground dark:text-background border-foreground/25 absolute top-8 right-8 z-40 flex cursor-pointer items-center gap-2 rounded-full border p-2 text-sm transition-all hover:scale-110 hover:rotate-12 active:scale-95"
			>
				<X className="h-6 w-6" />
			</button>

			<div
				className={classNames(
					'pointer-events-none absolute right-0 bottom-6 left-0 z-40 flex justify-center px-4 transition-opacity duration-300 md:bottom-8',
					{
						'opacity-100': isVisible,
						'opacity-0': !isVisible,
					},
				)}
			>
				<Link
					className="group pointer-events-auto"
					target="_blank"
					href={project.path}
					style={
						{
							'--background': project.secondaryColor,
							'--foreground': project.primaryColor,
						} as React.CSSProperties
					}
				>
					<div className="flex items-center gap-8 rounded-4xl bg-(--background) px-6 py-4 pr-4 text-(--foreground) shadow-md transition-all group-hover:scale-105 group-hover:shadow-xl">
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

						<span className="rounded-full bg-(--foreground) p-3 text-(--background) transition-all group-hover:scale-110">
							<ExternalLink className="h-4 w-4" />
						</span>
					</div>
				</Link>
			</div>

			{enlargedItem && enlargedIndex !== null ? (
				<div className="absolute inset-0 z-50">
					<button
						type="button"
						onClick={() => setEnlargedIndex(null)}
						aria-label="Minimise preview"
						tabIndex={-1}
						className="bg-background/85 absolute inset-0 h-full w-full cursor-zoom-out backdrop-blur-md"
					/>

					<button
						type="button"
						onClick={() => setEnlargedIndex(null)}
						aria-label="Minimise preview"
						className="bg-background text-foreground dark:bg-foreground dark:text-background border-foreground/25 absolute top-8 right-8 z-10 flex cursor-pointer items-center gap-2 rounded-full border p-2 text-sm transition-all hover:scale-110 hover:rotate-12 active:scale-95"
					>
						<X className="h-6 w-6" />
					</button>

					<div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 md:p-12">
						<div className="pointer-events-auto flex max-h-full w-auto max-w-full items-center justify-center">
							<GalleryMedia
								mediaItem={enlargedItem}
								label={getMediaItemLabel(
									enlargedItem,
									project.name,
									enlargedIndex,
								)}
								isEnlarged
							/>
						</div>
					</div>
				</div>
			) : null}
		</div>,
		document.body,
	);
};
