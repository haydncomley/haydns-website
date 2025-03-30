'use client';

import { useSearchParams } from 'next/navigation';

import { Menu } from '../menu';

export const NumberChainGame = () => {
	const searchParams = useSearchParams();
	const currentLevel = searchParams.get('level');

	return (
		<div className="w-full h-full flex flex-col items-center justify-center">
			{!currentLevel ? (
				<Menu />
			) : (
				<div>
					<h1>Level {currentLevel}</h1>
				</div>
			)}
		</div>
	);
};
