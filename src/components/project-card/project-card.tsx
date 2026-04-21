'use client';

import classNames from 'classnames';
import {
	ArrowRight,
	BadgeCheck,
	Gamepad2,
	TestTubeDiagonal,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import type { ProjectCategory } from '~/lib/types';

export type ProjectCardProps = {
	title: string;
	prettyPath: string[];
	href: string;
	description: React.ReactNode | React.ReactNode[];
	videoUrl: string;
	primaryColor: string;
	secondaryColor: string;
	onOpen: () => void;
	align?: 'start' | 'end';
	category: ProjectCategory;
};

export const ProjectCard = ({
	title,
	prettyPath,
	href,
	description,
	videoUrl,
	primaryColor,
	secondaryColor,
	onOpen,
	align = 'start',
	category,
}: ProjectCardProps) => {
	const foreground = primaryColor;
	const background = secondaryColor;
	const cardRef = useRef<HTMLButtonElement>(null);
	const tiltRef = useRef<HTMLDivElement>(null);
	const [isInViewOnMobile, setIsInViewOnMobile] = useState(false);
	const [isDesktopPointer, setIsDesktopPointer] = useState(false);
	const [isHoveredOnDesktop, setIsHoveredOnDesktop] = useState(false);

	useEffect(() => {
		if (typeof window === 'undefined' || !cardRef.current) {
			return;
		}

		const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)');
		let observer: IntersectionObserver | null = null;

		const updateObserver = () => {
			observer?.disconnect();

			if (!mediaQuery.matches || !cardRef.current) {
				setIsInViewOnMobile(false);
				return;
			}

			observer = new IntersectionObserver(
				([entry]) => {
					setIsInViewOnMobile(entry.isIntersecting);

					if (entry.isIntersecting) {
						const metaThemeElement = document.querySelector(
							'meta[name="theme-color"]',
						);
						if (metaThemeElement) {
							metaThemeElement.setAttribute('content', foreground);
						}
					}
				},
				{
					threshold: 0.2,
					rootMargin: '-30% 0px -30% 0px',
				},
			);

			observer.observe(cardRef.current);
		};

		updateObserver();
		mediaQuery.addEventListener('change', updateObserver);

		return () => {
			observer?.disconnect();
			mediaQuery.removeEventListener('change', updateObserver);
		};
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

		const updatePointerType = () => {
			setIsDesktopPointer(mediaQuery.matches);

			if (!mediaQuery.matches && tiltRef.current) {
				tiltRef.current.style.setProperty('--card-rotate-x', '0deg');
				tiltRef.current.style.setProperty('--card-rotate-y', '0deg');
			}
		};

		updatePointerType();
		mediaQuery.addEventListener('change', updatePointerType);

		return () => {
			mediaQuery.removeEventListener('change', updatePointerType);
		};
	}, []);

	const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (!isDesktopPointer || !tiltRef.current) {
			return;
		}

		const bounds = event.currentTarget.getBoundingClientRect();
		const mouseX = (event.clientX - bounds.left) / bounds.width;
		const mouseY = (event.clientY - bounds.top) / bounds.height;
		const rotateY = (mouseX - 0.5) * 12;
		const rotateX = (0.5 - mouseY) * 10;

		tiltRef.current.style.setProperty(
			'--card-rotate-x',
			`${rotateX.toFixed(2)}deg`,
		);
		tiltRef.current.style.setProperty(
			'--card-rotate-y',
			`${rotateY.toFixed(2)}deg`,
		);
	};

	const handleMouseLeave = () => {
		setIsHoveredOnDesktop(false);

		if (!tiltRef.current) {
			return;
		}

		tiltRef.current.style.setProperty('--card-rotate-x', '0deg');
		tiltRef.current.style.setProperty('--card-rotate-y', '0deg');
	};

	const handleMouseEnter = () => {
		if (!isDesktopPointer) {
			return;
		}

		setIsHoveredOnDesktop(true);
	};

	const isEnd = align === 'end';
	const cardRotate = isEnd
		? 'rotate-8 hover:rotate-6'
		: '-rotate-3 hover:-rotate-6';
	const mediaRotate = isEnd ? 'group-hover:rotate-2' : 'group-hover:-rotate-2';
	const titleRotate = isEnd
		? '-rotate-8 group-hover:-rotate-8'
		: 'rotate-3 group-hover:rotate-8';
	const iconRotate = isEnd ? 'group-hover:rotate-12' : 'group-hover:rotate-12';
	const descriptionRotate = isEnd
		? '-rotate-10 group-hover:-rotate-12'
		: 'rotate-8 group-hover:rotate-14';
	const isActive = isInViewOnMobile;
	const isStacked = isDesktopPointer && isHoveredOnDesktop;
	const titleLayerStyle = {
		transform: `translate3d(0, 0, ${isStacked ? 60 : 0}px)`,
		transformStyle: 'preserve-3d',
	} as React.CSSProperties;
	const mediaLayerStyle = {
		transform: `translate3d(0, 0, ${isStacked ? 10 : 0}px)`,
		transformStyle: 'preserve-3d',
	} as React.CSSProperties;
	const descriptionLayerStyle = {
		transform: `translate3d(0, 0, ${isStacked ? -40 : 0}px)`,
		transformStyle: 'preserve-3d',
	} as React.CSSProperties;

	return (
		<button
			ref={cardRef}
			type="button"
			onClick={onOpen}
			onMouseEnter={handleMouseEnter}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			aria-label={`Open preview for ${title}`}
			className={classNames(
				`group flex w-full cursor-pointer flex-col gap-0 border-0 bg-transparent p-0 text-left transition-all hover:z-10 hover:-translate-y-20 md:w-xs lg:w-md ${cardRotate} pointer-events-auto`,
				{
					'z-10 scale-100': isActive,
				},
			)}
			style={
				{
					'--background': background,
					'--foreground': foreground,
				} as React.CSSProperties
			}
		>
			<div
				ref={tiltRef}
				className="flex flex-col transition-transform duration-200 ease-out will-change-transform"
				style={
					{
						transform:
							'perspective(1400px) rotateX(var(--card-rotate-x, 0deg)) rotateY(var(--card-rotate-y, 0deg))',
						transformStyle: 'preserve-3d',
						'--card-rotate-x': '0deg',
						'--card-rotate-y': '0deg',
					} as React.CSSProperties
				}
			>
				{/* Media */}
				<div
					className="relative z-10 transition-transform duration-200 ease-out"
					style={mediaLayerStyle}
				>
					<div
						className={classNames(
							`aspect-video w-full rounded-4xl shadow-md transition-all group-hover:-translate-4 group-hover:scale-105 group-hover:shadow-lg ${mediaRotate}`,
							{
								'-translate-4 scale-105 shadow-lg': isActive,
								'rotate-2': isActive && isEnd,
								'-rotate-2': isActive && !isEnd,
							},
						)}
					>
						<video
							src={videoUrl}
							className="h-full w-full rounded-4xl object-cover"
							autoPlay
							muted
							loop
							playsInline
							// @ts-expect-error - `loading` is not yet recognized as a valid attribute on `video` elements in React, but it is supported in browsers and helps with performance.
							loading="lazy"
						/>
					</div>
				</div>
				{/* Title */}
				<div
					className={classNames(
						'relative z-10 transition-transform duration-200 ease-out',
						{
							'mr-auto': align === 'start',
							'ml-auto': align === 'end',
						},
					)}
					style={titleLayerStyle}
				>
					<div
						className={classNames(
							`flex -translate-y-4 items-center gap-8 rounded-4xl bg-(--background) px-6 py-4 pr-4 text-(--foreground) shadow-md transition-all group-hover:scale-105 group-hover:shadow-xl md:translate-x-2 ${titleRotate}`,
							{
								'shadow-lg': isActive,
								'-rotate-10!': isActive && isEnd,
								'-translate-x-2 rotate-6': isActive && !isEnd,
							},
						)}
					>
						<div className="flex flex-col gap-0.5">
							<h4 className="leading-none font-bold">{title}</h4>
							<p className="max-w-[12.5rem] overflow-hidden text-sm leading-none font-normal overflow-ellipsis whitespace-nowrap">
								{prettyPath.map((part, i) => (
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
								`rounded-full bg-(--foreground) p-3 text-(--background) transition-all group-hover:scale-110 ${iconRotate}`,
								{
									'scale-110 rotate-12': isActive,
								},
							)}
						>
							<ArrowRight className="h-4 w-4" />
							{/* {href.startsWith('http') ? (
								<ExternalLink className="h-4 w-4" />
							) : (
								<ArrowRight className="h-4 w-4" />
							)} */}
						</span>
					</div>
				</div>
				{/* Icons */}
				<div
					style={titleLayerStyle}
					className={classNames(
						'absolute translate-y-full transition-all max-md:hidden',
						{
							'right-6 bottom-8 group-hover:right-20 group-hover:bottom-2':
								align === 'start',
							'bottom-6 left-12 group-hover:bottom-0 group-hover:left-20':
								align === 'end',
						},
					)}
				>
					<div
						className={classNames(
							'flex h-10 w-10 items-center justify-center rounded-full bg-(--foreground) text-(--background) shadow-md transition-all group-hover:scale-90 group-hover:bg-(--background) group-hover:text-(--foreground)',
							{
								'-rotate-12': align === 'start',
							},
						)}
					>
						{category === 'games' ? <Gamepad2 /> : null}
						{category === 'experiments' ? <TestTubeDiagonal /> : null}
						{category === 'projects' ? <BadgeCheck /> : null}
					</div>
				</div>
				{/* Description */}
				<div
					className="transition-transform duration-200 ease-out"
					style={descriptionLayerStyle}
				>
					<div
						className={classNames(
							`mt-[-60%] w-full rounded-4xl border-2 border-dashed border-(--foreground) p-4 pt-[60%] text-(--background) opacity-50 transition-all group-hover:bg-(--foreground) group-hover:opacity-100 group-hover:shadow-xl md:translate-x-2 ${descriptionRotate}`,
							{
								'bg-(--foreground) opacity-100 shadow-xl': isActive,
								'-rotate-12': isActive && isEnd,
								'rotate-6!': isActive && !isEnd,
							},
						)}
					>
						<p
							className={classNames(
								'overflow-hidden p-1 leading-tight opacity-0 transition-all group-hover:max-h-[10rem] group-hover:pt-8 group-hover:opacity-100 md:max-h-0',
								{
									'max-h-[10rem] opacity-100': isActive,
								},
							)}
						>
							{description}
						</p>
					</div>
				</div>
			</div>
		</button>
	);
};
