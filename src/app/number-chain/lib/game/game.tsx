'use client';

import { useSearchParams } from 'next/navigation';

import { AllLevels } from '../all-levels';
import { Level } from '../level';
import { Menu } from '../menu';

export const NumberChainGame = () => {
	const searchParams = useSearchParams();
	const currentLevel = searchParams.get('level');
	const viewingAllLevels = searchParams.get('allLevels');

	return (
		<div className="flex h-full w-full flex-col items-center justify-center overscroll-none select-none">
			{!currentLevel && !viewingAllLevels ? <Menu /> : null}
			{currentLevel ? (
				<Level
					key={currentLevel}
					level={Number(currentLevel)}
				/>
			) : null}
			{viewingAllLevels ? <AllLevels /> : null}
		</div>
	);
};
