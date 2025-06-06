'use client';

import classNames from 'classnames';
import JSConfetti from 'js-confetti';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Block } from '../block';
import { LEVELS } from '../consts';
import type { Vec2 } from '../types';
import { WiggleText } from '../wiggle-text';

export type LevelProps = {
	level: number;
};

export const Level = ({ level }: LevelProps) => {
	const router = useRouter();
	const levelDetails = LEVELS[level - 1];
	const nextLevelDetails = LEVELS[level];

	const boardRef = useRef<HTMLDivElement>(null);

	const [levelState, setLevelState] = useState(levelDetails.layout);
	const [isChaining, setIsChaining] = useState(false);
	const [currentScore, setCurrentScore] = useState(0);
	const [blocksInChain, setBlocksInChain] = useState<Vec2[]>([]);
	const [isLevelCompleted, setIsLevelCompleted] = useState(false);
	const [turnsTaken, setTurnsTaken] = useState(0);

	useEffect(() => {
		const lastLevelCompleted = parseInt(
			localStorage.getItem('lastLevelCompleted') ?? '0',
		);

		const isTryingToSkipAhead = level > lastLevelCompleted + 1;
		if (isTryingToSkipAhead) router.push(`?level=${lastLevelCompleted + 1}`);
	}, [level]);

	const isValidMove = (pos: Vec2) => {
		const blockDetails = levelState[pos.y][pos.x];
		let currentBlocksInChain = [...blocksInChain];

		if (blockDetails.isDone) return currentBlocksInChain;
		if (blockDetails.isBlock) return currentBlocksInChain;

		if (
			currentBlocksInChain.some(
				(block) => block.x === pos.x && block.y === pos.y,
			)
		) {
			const touchedIndex = currentBlocksInChain.findIndex(
				(block) => block.x === pos.x && block.y === pos.y,
			);
			if (touchedIndex >= 0) {
				currentBlocksInChain = currentBlocksInChain.slice(0, touchedIndex + 1);
				return currentBlocksInChain;
			}
			return currentBlocksInChain;
		}

		const lastBlock = currentBlocksInChain[currentBlocksInChain.length - 1];
		if (lastBlock) {
			const dx = Math.abs(lastBlock.x - pos.x);
			const dy = Math.abs(lastBlock.y - pos.y);
			if (dx > 1 || dy > 1 || (dx === 1 && dy === 1))
				return currentBlocksInChain;
		}

		return [...currentBlocksInChain, pos];
	};

	const addToChain = (pos: Vec2) => {
		const currentBlocksInChain = isValidMove(pos);
		if (!isChaining) setIsChaining(true);

		let currentChainValue = currentBlocksInChain.reduce((acc, block) => {
			const blockDetails = levelState[block.y][block.x];
			return acc + (blockDetails.value ?? 0);
		}, 0);

		if (currentChainValue > levelDetails.target) return;

		currentBlocksInChain.forEach((block) => {
			const blockDetails = levelState[block.y][block.x];
			switch (blockDetails.operation ?? 'none') {
				case 'double':
					currentChainValue *= 2;
					break;
				default:
					break;
			}
		});

		if (currentChainValue !== currentScore) {
			navigator?.vibrate?.(50);
		}
		setBlocksInChain(currentBlocksInChain);
		setCurrentScore(currentChainValue);
	};

	const resetLevel = () => {
		setLevelState(levelDetails.layout);
		setIsLevelCompleted(false);
		setCurrentScore(0);
		setBlocksInChain([]);
		setIsChaining(false);
		setTurnsTaken(0);
	};

	const stopChaining = () => {
		if (!isChaining || isLevelCompleted) return;

		let levelStateNow = [...levelState];

		const findPrevInChangeDir = (pos: Vec2) => {
			const currentBlock = blocksInChain.findIndex(
				(block) => block.x === pos.x && block.y === pos.y,
			);

			if (currentBlock === 0) return undefined;
			const prevBlock = blocksInChain[currentBlock - 1];

			return prevBlock
				? { x: prevBlock.x - pos.x, y: prevBlock.y - pos.y }
				: undefined;
		};

		levelStateNow = levelStateNow.map((row, y) =>
			row.map((block, x) =>
				blocksInChain.some(
					(chainBlock) => chainBlock.x === x && chainBlock.y === y,
				)
					? {
							...block,
							isDone: currentScore === levelDetails.target,
							value: block.value !== undefined ? currentScore : undefined,
							connectedDir:
								currentScore === levelDetails.target
									? findPrevInChangeDir({ x, y })
									: undefined,
						}
					: block,
			),
		);

		const isLevelCompletedNow = levelStateNow.every((row) =>
			row.every((block) => block.isDone || block.isBlock),
		);

		setLevelState(levelStateNow);
		setIsLevelCompleted(isLevelCompletedNow);

		if (isLevelCompletedNow) {
			const lastLevelCompleted = parseInt(
				localStorage.getItem('lastLevelCompleted') ?? '0',
			);

			if (lastLevelCompleted < level) {
				localStorage.setItem('lastLevelCompleted', level.toString());
			}

			navigator?.vibrate?.([50]);
			const jsConfetti = new JSConfetti();
			jsConfetti.addConfetti({});
			const lastScore = Number(
				localStorage.getItem(`level-${level}-best-score`) ?? Infinity,
			);

			localStorage.setItem(
				`level-${level}-best-score`,
				Math.min(turnsTaken + 1, lastScore).toString(),
			);
		}

		setBlocksInChain([]);
		setIsChaining(false);
		setCurrentScore(0);
		if (currentScore === levelDetails.target || blocksInChain.length > 1)
			setTurnsTaken((prev) => prev + 1);
	};

	useEffect(() => {
		const abortController = new AbortController();
		const { signal } = abortController;

		window.addEventListener('mouseup', stopChaining, { signal });
		window.addEventListener('touchend', stopChaining, { signal });

		return () => abortController.abort();
	}, [blocksInChain.length, isChaining]);

	useEffect(() => {
		if (!boardRef.current) return;

		const checkBoardWidth = () => {
			if (!boardRef.current) return;
			const currentWidth = boardRef.current.clientWidth;
			const currentHeight = boardRef.current.clientHeight;
			const percentage = Math.max(
				currentWidth / window.innerWidth,
				currentHeight / boardRef.current.parentElement!.clientHeight,
			);

			if (percentage > 1) {
				boardRef.current.style.transform = `scale(${2 - percentage - 0.1})`;
			} else {
				boardRef.current.style.transform = 'scale(1)';
			}
		};

		const mutationObserver = new MutationObserver(() => {
			checkBoardWidth();
		});

		mutationObserver.observe(boardRef.current, {
			childList: true,
			subtree: true,
		});
		checkBoardWidth();

		return () => mutationObserver.disconnect();
	}, [boardRef]);

	return (
		<div className="flex flex-col gap-2">
			<div className="absolute top-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 md:top-[3rem]">
				<div className="flex flex-col items-center text-center">
					<h2 className="text-3xl font-bold whitespace-nowrap">
						{levelDetails.name}
					</h2>
					<p>
						{levelDetails.category} - Level {level}
					</p>
				</div>

				<div className="flex gap-6 text-3xl font-bold">
					<div className="flex flex-col items-center">
						<p
							className={classNames({
								'text-primary': currentScore !== levelDetails.target,
								'text-secondary':
									currentScore === levelDetails.target || currentScore === 0,
							})}
						>
							{currentScore === 0 ? (
								<>{levelDetails.target}</>
							) : (
								<>
									{currentScore}
									<small className="text-foreground/50 text-base">
										/{levelDetails.target}
									</small>
								</>
							)}
						</p>
						<small className="text-xs opacity-50">Target</small>
					</div>
					<div className="flex flex-col items-center">
						<p className="text-foreground">
							{turnsTaken}
							<small className="text-foreground/50 text-base">
								/{levelDetails.par}
							</small>
						</p>
						<small className="text-xs opacity-50">Strokes</small>
					</div>
				</div>
			</div>

			<div className="relative flex max-h-[60vh] flex-col items-center justify-center">
				<div
					ref={boardRef}
					className={classNames(
						'flex origin-center flex-col gap-3 transition-all',
						{
							'pointer-events-none opacity-50 blur-md': isLevelCompleted,
						},
					)}
				>
					{levelState.map((row, rowIndex) => (
						<div
							key={rowIndex}
							className="flex gap-3"
						>
							{row.map((block, colIndex) => {
								const isInChain = blocksInChain.findIndex(
									(block) => block.x === colIndex && block.y === rowIndex,
								);
								const couldLockIn =
									currentScore === levelDetails.target && isInChain !== -1;

								let connectedDir: Vec2 | undefined;

								if (isInChain !== -1) {
									const blockConnectedTo = Math.max(
										blocksInChain.findIndex(
											(chainBlock) =>
												chainBlock.x === colIndex && chainBlock.y === rowIndex,
										) - 1,
										0,
									);

									connectedDir =
										blockConnectedTo >= 0
											? {
													x: blocksInChain[blockConnectedTo]?.x - colIndex,
													y: blocksInChain[blockConnectedTo]?.y - rowIndex,
												}
											: undefined;
								}

								return (
									<Block
										key={colIndex}
										{...block}
										couldLockIn={couldLockIn}
										levelCompleted={isLevelCompleted}
										pos={{ x: colIndex, y: rowIndex }}
										currentScore={currentScore}
										inChain={isInChain !== -1}
										index={blocksInChain.length - isInChain}
										onHover={() => {
											if (isChaining) addToChain({ x: colIndex, y: rowIndex });
										}}
										onTap={() => {
											if (!isChaining) addToChain({ x: colIndex, y: rowIndex });
										}}
										connectedTo={block.connectedDir ?? connectedDir}
									/>
								);
							})}
						</div>
					))}
				</div>

				{isLevelCompleted ? (
					<div className="absolute flex flex-col items-center gap-3 rounded-xl p-2 text-center whitespace-nowrap">
						<p className="text-3xl font-bold">
							{!nextLevelDetails ? (
								<WiggleText content="All Levels Completed" />
							) : (
								<WiggleText content="Level Completed" />
							)}
						</p>
						<p className="text-2xl">
							{nextLevelDetails?.category !== levelDetails.category ? (
								<WiggleText content="Category Cleared" />
							) : null}
						</p>
						<div className="border-foreground/15 bg-background/25 mt-4 flex items-center gap-4 rounded-xl border-2 p-3 px-4 shadow-md backdrop-blur-md">
							<p className="flex flex-col">
								<small>Total Turns</small>
								<b className="text-xl">{turnsTaken}</b>
							</p>
							{turnsTaken > levelDetails.par ? (
								<>
									•
									<p className="flex flex-col">
										<small>Over Par</small>
										<b className="text-xl">{turnsTaken - levelDetails.par}</b>
									</p>
								</>
							) : null}
						</div>
						{turnsTaken === levelDetails.par ? (
							<p className="text-secondary text-lg font-bold tracking-wide uppercase">
								Perfect Game
							</p>
						) : null}
						{turnsTaken < levelDetails.par ? (
							<p className="text-primary text-lg font-bold tracking-wide uppercase">
								Under Par
							</p>
						) : null}
					</div>
				) : null}
			</div>

			<div className="absolute right-0 bottom-0 left-0 z-10 flex items-center justify-between p-4 md:right-auto md:bottom-[4rem] md:left-1/2 md:translate-x-[-50%] md:gap-4">
				<Link
					href={'/number-chain'}
					className="bg-foreground text-background relative rounded-2xl p-3 px-6 text-lg font-semibold uppercase shadow-md transition-all hover:scale-105 hover:shadow-lg"
				>
					Home
				</Link>
				<button
					onClick={resetLevel}
					className="bg-secondary text-secondary-foreground relative rounded-2xl p-3 px-6 text-lg font-semibold uppercase shadow-md transition-all hover:scale-105 hover:shadow-lg"
				>
					Reset
				</button>
				<Link
					href={`?level=${level + 1}`}
					className={classNames(
						'bg-primary text-primary-foreground relative rounded-2xl p-3 px-6 text-lg font-semibold uppercase shadow-md transition-all hover:scale-105 hover:shadow-lg',
						{
							'!bg-foreground/50 !text-background pointer-events-none opacity-50':
								!nextLevelDetails || !isLevelCompleted,
						},
					)}
				>
					Next
				</Link>
			</div>
		</div>
	);
};
