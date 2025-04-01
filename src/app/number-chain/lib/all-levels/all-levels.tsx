'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { LEVELS } from '../consts';
import type { ILevel } from '../types';

const levelsGrouped = LEVELS.reduce(
	(acc, level) => {
		if (!acc[level.category]) {
			acc[level.category] = [];
		}
		acc[level.category].push(level);
		return acc;
	},
	{} as Record<string, ILevel[]>,
);

export const AllLevels = () => {
	const [maxLevel, setMaxLevel] = useState(0);

	useEffect(() => {
		setMaxLevel(Number(localStorage.getItem('lastLevelCompleted') ?? '0'));
	}, []);

	return (
		<div className="w-full max-h-full overflow-auto pb-20 lg:w-auto lg:mx-auto">
			{Object.entries(levelsGrouped).map(([category, levels], groupIndex) => (
				<div
					key={category}
					className="flex flex-col p-5 gap-2"
				>
					<h1 className="text-lg font-bold">{category}</h1>
					<div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
						{levels.map((level, index) => {
							// Add up all the levels in the group before this one
							const levelIndex =
								Object.values(levelsGrouped)
									.slice(0, groupIndex)
									.reduce((acc, level) => acc + level.length, 0) + index;
							const bestScore = Number(
								localStorage.getItem(`level-${levelIndex + 1}-best-score`) ??
									Infinity,
							);
							const isPerfect = bestScore <= level.par;

							return (
								<a
									key={index}
									href={`?level=${levelIndex + 1}`}
									className={classNames(
										'flex flex-col p-4 px-6 rounded-xl hover:shadow-md hover:scale-105 transition-all',
										{
											'pointer-events-none bg-foreground/15 opacity-50':
												levelIndex > maxLevel,
											'bg-foreground text-background': !(levelIndex > maxLevel),
											'bg-secondary text-secondary-foreground': isPerfect,
										},
									)}
								>
									<small className="text-base opacity-80">
										# {levelIndex + 1}
									</small>
									<span className="text-xl font-bold">{level.name}</span>
									{Number.isFinite(bestScore) ? (
										<span>
											{isPerfect ? 'Perfect' : 'Best'} - {bestScore}
											<small className="text-xs opacity-80">
												{' '}
												/ {level.par}
											</small>
										</span>
									) : null}
								</a>
							);
						})}
					</div>
				</div>
			))}

			<div className="absolute flex bottom-0 left-0 right-0 items-center justify-between p-4 z-10 md:bottom-1/8 md:left-1/2 md:right-auto md:translate-x-[-50%] md:gap-4">
				<Link
					href={'/number-chain'}
					className="relative text-lg font-semibold bg-foreground text-background uppercase rounded-2xl p-3 px-6 shadow-md hover:scale-105 transition-all hover:shadow-lg"
				>
					Home
				</Link>
			</div>
		</div>
	);
};
