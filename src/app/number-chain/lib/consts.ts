import type { ILevel } from './types';

export const LEVELS: ILevel[] = [
	{
		name: 'Level 1',
		target: 2,
		par: 1,
		layout: [[{ value: 1 }, { value: 1 }]],
	},
	{
		name: 'Level 2',
		target: 4,
		par: 2,
		layout: [[{ value: 2 }, { value: 2 }, { value: 2 }, { value: 2 }]],
	},
	{
		name: 'Level 3',
		target: 6,
		par: 2,
		layout: [
			[{ value: 2 }, { value: 2 }],
			[{ value: 2 }, { value: 2 }],
			[{ value: 2 }, { value: 2 }],
		],
	},
	{
		name: 'Level 4',
		target: 4,
		par: 2,
		layout: [
			[{ value: 2 }, { value: 2 }],
			[{ isBlock: true }, { isBlock: true }],
			[{ value: 2 }, { value: 2 }],
		],
	},
];
