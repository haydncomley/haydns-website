'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { LEVELS } from '../consts';
import { WiggleText } from '../wiggle-text';

export const Menu = () => {
	const [lastLevelCompleted, setLastLevelCompleted] = useState<number | null>(
		null,
	);

	useEffect(() => {
		setLastLevelCompleted(
			Number(localStorage.getItem('lastLevelCompleted') ?? '0'),
		);
	}, []);

	return (
		<div className="w-full h-full flex flex-col items-center justify-center gap-10">
			<Link
				href="/"
				className="absolute top-4 left-4 rounded-full bg-foreground/5 p-3 hover:bg-foreground/10 transition-all"
			>
				<ArrowLeft className="w-6 h-6" />
			</Link>

			<div className="flex flex-col gap-4 items-center -translate-y-12">
				<h1 className="text-4xl font-bold uppercase">
					<WiggleText content="Number Chain" />
				</h1>

				<div className="flex flex-col gap-4 items-center">
					{lastLevelCompleted !== null ? (
						<p className="text-sm text-foreground/50">
							Played {lastLevelCompleted} out of {LEVELS.length} levels
						</p>
					) : (
						<p className="text-sm text-foreground/50">Loading...</p>
					)}

					<a
						href={`?level=${Math.min((lastLevelCompleted ?? 0) + 1, LEVELS.length)}`}
						className="relative text-xl font-semibold bg-primary text-primary-foreground uppercase tracking-wide rounded-2xl p-3 w-48 text-center shadow-md hover:scale-105 transition-all hover:shadow-lg"
					>
						<span>{!lastLevelCompleted ? 'Play' : 'Continue'}</span>
					</a>

					<a
						href="?allLevels=true"
						className="relative text-base font-semibold bg-foreground text-background uppercase tracking-wide rounded-2xl p-2 w-36 text-center shadow-md hover:scale-105 transition-all hover:shadow-lg"
					>
						<span>All Levels</span>
					</a>
				</div>
			</div>

			<div className="flex flex-col max-w-[90%] bg-foreground/5 text-foreground shadow-md p-4 gap-1 rounded-xl mt-16 absolute bottom-4 md:bottom-1/8">
				<p className="font-bold text-md text-center">How to play</p>
				<div className="text-sm">
					<b>1.</b> Swipe over blocks to start chaining them. <br />
					<b>2.</b> Let go to add the numbers together. <br />
					<b>3.</b> Blocks will lock in when they equal the target. <br />
					<b>4.</b> Lock in all blocks to beat the level.
					<hr className="opacity-15 my-2" />
					<p className="text-center text-sm">
						Try to beat the level in as few moves as possible
					</p>
				</div>
			</div>
		</div>
	);
};
