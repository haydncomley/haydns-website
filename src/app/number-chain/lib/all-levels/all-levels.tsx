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
		<div className="max-h-full w-full overflow-auto pb-20 lg:mx-auto lg:w-auto">
			{Object.entries(levelsGrouped).map(([category, levels], groupIndex) => (
				<div
					key={category}
					className="flex flex-col gap-2 p-5"
				>
					<h1 className="text-lg font-bold">{category}</h1>
					<div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-8">
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
										'flex flex-col rounded-xl p-4 px-6 transition-all hover:scale-105 hover:shadow-md',
										{
											'bg-foreground/15 pointer-events-none opacity-50':
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

			<div className="absolute right-0 bottom-0 left-0 z-10 flex items-center justify-between p-4 md:right-auto md:bottom-1/8 md:left-1/2 md:translate-x-[-50%] md:gap-4">
				<Link
					href={'/number-chain'}
					className="bg-foreground text-background relative rounded-2xl p-3 px-6 text-lg font-semibold uppercase shadow-md transition-all hover:scale-105 hover:shadow-lg"
				>
					Home
				</Link>
			</div>
		</div>
	);
};
