import classNames from 'classnames';
import { useEffect, useRef } from 'react';

import { OPERATION_LABELS, type ILevelBlock, type Vec2 } from '../types';
import styles from './block.module.css';

export type BlockProps = ILevelBlock & {
	onHover: () => void;
	onTap: () => void;
	inChain?: boolean;
	pos: Vec2;
	couldLockIn?: boolean;
	currentScore?: number;
	levelCompleted?: boolean;
	connectedTo?: Vec2;
	index?: number;
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
	operation,
	connectedTo,
	index,
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
			className={classNames('relative', {
				[styles.in]: !couldLockIn,
				[styles.wiggle]: inChain,
			})}
			style={{
				animationDelay: `${(pos.x + pos.y) * 0.05}s`,
				zIndex: index,
			}}
		>
			<div
				className={classNames(
					'bg-foreground/15 hover:bg-foreground/25 flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-150',
					{
						'!bg-background border-primary border-4': inChain && !couldLockIn,
						'!bg-secondary text-secondary-foreground scale-90': couldLockIn,
						'!bg-secondary text-secondary': isDone,
						'border-foreground/15 !bg-background cursor-not-allowed border-4':
							isBlock,
						[styles.pop]: inChain || isDone,
					},
				)}
			>
				<p className="text-2xl font-bold">
					{operation
						? OPERATION_LABELS[operation]
						: inChain
							? currentScore
							: value}
				</p>
			</div>

			<div
				className={classNames(
					'absolute top-1/2 left-1/2 -z-1 rounded-full transition-all delay-75 duration-75',
					{
						'bg-primary': inChain,
						'bg-secondary/50': couldLockIn || isDone,
						'h-8 w-8 -translate-x-1/2 -translate-y-1/2': !connectedTo,
						'h-8 w-full -translate-x-full -translate-y-1/2':
							connectedTo?.x === -1,
						'h-8 w-full -translate-y-1/2': connectedTo?.x === 1,
						'h-full w-8 -translate-x-1/2 -translate-y-full':
							connectedTo?.y === -1,
						'h-full w-8 -translate-x-1/2': connectedTo?.y === 1,
					},
				)}
			></div>
		</div>
	);
};
