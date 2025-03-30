'use client';

import { useEffect, useState } from 'react';

import { LEVELS } from '../consts';
import { WiggleText } from '../wiggle-text';

export const Menu = () => {
	const [lastLevelCompleted, setLastLevelCompleted] = useState(0);

	useEffect(() => {
		setLastLevelCompleted(
			Number(localStorage.getItem('lastLevelCompleted') ?? '0'),
		);
	}, []);

	return (
		<div className="w-full h-full flex flex-col items-center justify-center gap-10">
			<h1 className="text-4xl font-bold uppercase">
				<WiggleText content="Number Chain" />
			</h1>

			<div className="flex flex-col gap-4 items-center">
				{lastLevelCompleted > 0 ? (
					<p className="text-sm text-foreground/50">
						Played {lastLevelCompleted} out of {LEVELS.length} levels
					</p>
				) : (
					<p className="text-sm text-foreground/50">Loading...</p>
				)}

				<a
					href={`?level=${Math.min(lastLevelCompleted + 1, LEVELS.length)}`}
					className="relative text-xl font-semibold bg-primary text-primary-foreground uppercase tracking-wide rounded-2xl p-3 w-48 text-center shadow-md hover:scale-105 transition-all hover:shadow-lg"
				>
					<span>{lastLevelCompleted === 0 ? 'Play' : 'Continue'}</span>
				</a>

				<a
					href="?allLevels=true"
					className="relative text-base font-semibold bg-foreground text-background uppercase tracking-wide rounded-2xl p-2 w-36 text-center shadow-md hover:scale-105 transition-all hover:shadow-lg"
				>
					<span>All Levels</span>
				</a>
			</div>

			<div className="flex flex-col max-w-[90%] bg-foreground/5 text-foreground shadow-md p-4 gap-1 rounded-xl mt-16 absolute bottom-4 md:bottom-1/8">
				<p className="font-bold text-lg text-center">How to play</p>
				<p>
					<b>1.</b> Chain blocks together to add their numbers up <br />
					<b>2.</b> Reach the target to lock them in place <br />
					<b>3.</b> Lock all blocks in place to beat the level
				</p>
			</div>
		</div>
	);
};
