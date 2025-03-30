import classNames from 'classnames';
import { useEffect, useRef } from 'react';

import type { ILevelBlock, Vec2 } from '../types';
import styles from './block.module.css';

export type BlockProps = ILevelBlock & {
	onHover: () => void;
	onTap: () => void;
	inChain?: boolean;
	pos: Vec2;
	couldLockIn?: boolean;
	currentScore?: number;
	levelCompleted?: boolean;
};

export const Block = ({
	value,
	onHover,
	onTap,
	inChain,
	isDone,
	isBlock,
	pos,
	couldLockIn,
	currentScore,
	levelCompleted,
}: BlockProps) => {
	const blockRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!blockRef.current || levelCompleted) return;

		const abortController = new AbortController();
		const { signal } = abortController;

		const onDown = (e: MouseEvent | TouchEvent) => {
			if (!blockRef.current) return;
			const bounds = blockRef.current.getBoundingClientRect();
			const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
			const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

			const isWithinBounds =
				x >= bounds.left &&
				x <= bounds.right &&
				y >= bounds.top &&
				y <= bounds.bottom;

			if (!isWithinBounds) return;

			onTap();
		};

		const onMove = (e: MouseEvent | TouchEvent) => {
			e.preventDefault();
			if (!blockRef.current) return;
			const bounds = blockRef.current.getBoundingClientRect();
			const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
			const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

			const isWithinBounds =
				x >= bounds.left &&
				x <= bounds.right &&
				y >= bounds.top &&
				y <= bounds.bottom;

			if (!isWithinBounds) return;
			onHover();
		};

		window.addEventListener('mousedown', onDown, { signal, passive: false });
		window.addEventListener('touchstart', onDown, { signal, passive: false });
		window.addEventListener('mousemove', onMove, { signal, passive: false });
		window.addEventListener('touchmove', onMove, { signal, passive: false });

		return () => abortController.abort();
	}, [blockRef, onHover, onTap, levelCompleted]);

	return (
		<div
			ref={blockRef}
			className={classNames({
				[styles.in]: !couldLockIn,
				[styles.wiggle]: inChain,
			})}
			style={{
				animationDelay: `${(pos.x + pos.y) * 0.05}s`,
			}}
		>
			<div
				className={classNames(
					'w-20 h-20 rounded-2xl bg-foreground/15 flex items-center justify-center transition-all hover:bg-foreground/25',
					{
						'!bg-transparent border-4 border-primary': inChain && !couldLockIn,
						'scale-75 !bg-primary text-primary-foreground': couldLockIn,
						'!bg-secondary text-transparent': isDone,
						'border-4 border-foreground/15 !bg-transparent cursor-not-allowed':
							isBlock,
						[styles.pop]: inChain || isDone,
					},
				)}
			>
				<p className="text-2xl font-bold">{inChain ? currentScore : value}</p>
			</div>
		</div>
	);
};
