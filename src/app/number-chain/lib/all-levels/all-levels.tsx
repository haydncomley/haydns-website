'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { LEVELS } from '../consts';

export const AllLevels = () => {
	const [maxLevel, setMaxLevel] = useState(0);

	useEffect(() => {
		setMaxLevel(Number(localStorage.getItem('lastLevelCompleted') ?? '0'));
	}, []);

	return (
		<div className="grid grid-cols-2 w-full max-h-full overflow-auto gap-4 p-5 md:grid-cols-4 lg:grid-cols-7 lg:w-auto lg:mx-auto">
			{LEVELS.map((level, index) => {
				const bestScore = Number(
					localStorage.getItem(`level-${index + 1}-best-score`) ?? Infinity,
				);
				const isPerfect = bestScore <= level.par;

				return (
					<a
						key={index}
						href={`?level=${index + 1}`}
						className={classNames(
							'flex flex-col p-4 px-6 rounded-xl hover:shadow-md hover:scale-105 transition-all',
							{
								'pointer-events-none bg-foreground/15 opacity-50':
									index > maxLevel,
								'bg-foreground text-background': !(index > maxLevel),
								'bg-secondary text-secondary-foreground': isPerfect,
							},
						)}
					>
						<small className="text-base opacity-80">Level {index + 1}</small>
						<span className="text-xl font-bold">{level.name}</span>
						{Number.isFinite(bestScore) ? (
							<span>
								Best: {bestScore}
								<small className="text-sm opacity-80"> / {level.par}</small>
							</span>
						) : null}
						{isPerfect ? <span>Perfect Game</span> : null}
					</a>
				);
			})}

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
