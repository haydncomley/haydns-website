'use client';

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';

import styles from './project-row.module.css';

const INTRO_DELAY_MS = 1500;

export type ProjectRowProps = {
	displayIndex?: number;
	isFirst?: boolean;
	isVisible?: boolean;
	align?: 'start' | 'end';
} & PropsWithChildren;

export const ProjectRow = ({
	children,
	displayIndex = 0,
	align = 'start',
	isFirst = false,
	isVisible = true,
}: ProjectRowProps) => {
	const [hasStartedIntro, setHasStartedIntro] = useState(false);

	useEffect(() => {
		if (hasStartedIntro) {
			return;
		}

		const startIntro = () => {
			setHasStartedIntro(true);
		};

		if (window.scrollY > 0) {
			startIntro();
			return;
		}

		const timeoutId = window.setTimeout(startIntro, INTRO_DELAY_MS);

		window.addEventListener('scroll', startIntro, {
			passive: true,
			once: true,
		});

		return () => {
			window.clearTimeout(timeoutId);
			window.removeEventListener('scroll', startIntro);
		};
	}, [hasStartedIntro]);

	return (
		<section
			aria-hidden={!isVisible}
			className={classNames(
				styles['project-row'],
				{
					[styles['project-row--intro-active']]: hasStartedIntro,
				},
				'pointer-events-none flex w-full max-w-6xl justify-center overflow-visible px-12 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-16',
				{
					'mt-16 translate-y-0 opacity-100 md:mt-0': isVisible,
					'translate-y-10 opacity-0': !isVisible,
				},
			)}
			style={{
				transitionDelay: isVisible ? `${displayIndex * 45}ms` : '0ms',
				opacity: hasStartedIntro ? undefined : 0,
			}}
		>
			<div
				className={classNames(
					'grid w-full transition-[grid-template-rows,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
					{
						'grid-rows-[1fr]': isVisible,
						'grid-rows-[0fr]': !isVisible,
					},
				)}
			>
				<div
					className={classNames('min-h-0', {
						'overflow-visible': isVisible,
						'overflow-hidden': !isVisible,
					})}
				>
					<div
						className={classNames(
							'flex w-full justify-center transition-[margin,transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-80',
							{
								'mt-8 md:-mt-16': isVisible && !isFirst,
								'-mt-8 md:mt-auto': isVisible && isFirst,
								'mt-0 md:mt-0': !isVisible,
								'md:justify-end': align === 'end',
								'md:justify-start': align === 'start',
							},
						)}
					>
						{children}
					</div>
				</div>
			</div>
		</section>
	);
};
