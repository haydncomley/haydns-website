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
		<div className="flex h-full w-full flex-col items-center justify-center gap-10">
			<Link
				href="/"
				className="bg-foreground/5 hover:bg-foreground/10 absolute top-4 left-4 rounded-full p-3 transition-all"
			>
				<ArrowLeft className="h-6 w-6" />
			</Link>

			<div className="flex -translate-y-12 flex-col items-center gap-4">
				<h1 className="text-4xl font-bold uppercase">
					<WiggleText content="Number Chain" />
				</h1>

				<div className="flex flex-col items-center gap-4">
					{lastLevelCompleted !== null ? (
						<div className="text-center">
							{lastLevelCompleted === LEVELS.length ? (
								<p className="text-secondary animate-pulse font-semibold">
									All levels completed!
								</p>
							) : null}
							<p className="text-foreground/50 text-sm">
								Completed {lastLevelCompleted} out of {LEVELS.length} levels
							</p>
						</div>
					) : (
						<p className="text-foreground/50 text-sm">Loading...</p>
					)}

					<a
						href={`?level=${Math.min((lastLevelCompleted ?? 0) + 1, LEVELS.length)}`}
						className="bg-primary text-primary-foreground relative w-48 rounded-2xl p-3 text-center text-xl font-semibold tracking-wide uppercase shadow-md transition-all hover:scale-105 hover:shadow-lg"
					>
						<span>{!lastLevelCompleted ? 'Play' : 'Continue'}</span>
					</a>

					<a
						href="?allLevels=true"
						className="bg-foreground text-background relative w-36 rounded-2xl p-2 text-center text-base font-semibold tracking-wide uppercase shadow-md transition-all hover:scale-105 hover:shadow-lg"
					>
						<span>All Levels</span>
					</a>
				</div>
			</div>

			<div className="bg-foreground/5 text-foreground absolute bottom-4 mt-16 flex max-w-[90%] flex-col gap-1 rounded-xl p-4 shadow-md md:bottom-1/8">
				<p className="text-md text-center font-bold">How to play</p>
				<div className="text-sm">
					<b>1.</b> Swipe the blocks to start chaining them. <br />
					<b>2.</b> Let go to add the numbers together. <br />
					<b>3.</b> Blocks will lock in when they equal the target. <br />
					<b>4.</b> Lock in all blocks to beat the level.
					<hr className="my-2 opacity-15" />
					<p className="text-center text-sm">
						Try to beat the level in as few moves as possible
					</p>
				</div>
			</div>
		</div>
	);
};
