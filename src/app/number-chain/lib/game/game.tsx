'use client';

import { AllLevels } from '../all-levels';
import { Level } from '../level';
import { Menu } from '../menu';

export type NumberChainGameProps = {
	currentLevel: number | null;
	viewingAllLevels: boolean;
};

export const NumberChainGame = ({
	currentLevel,
	viewingAllLevels,
}: NumberChainGameProps) => (
	<div className="flex h-full w-full flex-col items-center justify-center overscroll-none select-none">
		{!currentLevel && !viewingAllLevels ? <Menu /> : null}
		{currentLevel ? (
			<Level
				key={currentLevel}
				level={currentLevel}
			/>
		) : null}
		{viewingAllLevels ? <AllLevels /> : null}
	</div>
);
