import type { ILevel } from './types';

export const LEVELS: ILevel[] = [
	{
		name: 'Intro',
		category: 'Intro',
		target: 2,
		par: 1,
		layout: [[{ value: 1 }, { value: 1 }]],
	},
	{
		name: 'Level Two',
		category: 'Intro',
		target: 4,
		par: 2,
		layout: [
			[{ value: 2 }, { value: 2 }],
			[{ value: 2 }, { value: 2 }],
		],
	},
	{
		name: 'Threes',
		category: 'Intro',
		target: 6,
		par: 1,
		layout: [
			[{ value: 1 }, { value: 1 }],
			[{ value: 1 }, { value: 1 }],
			[{ value: 1 }, { value: 1 }],
		],
	},
	{
		name: 'Par Four',
		category: 'Intro',
		target: 4,
		par: 4,
		layout: [
			[{ value: 3 }, { value: 2 }, { value: 1 }],
			[{ value: 1 }, { value: 1 }, { value: 1 }],
			[{ value: 1 }, { value: 3 }, { value: 3 }],
		],
	},
	{
		name: 'Doubling Up',
		category: 'Intro',
		target: 10,
		par: 3,
		layout: [
			[{ value: 2 }, { value: 5 }],
			[{ value: 1 }, { value: 2 }],
		],
	},
	{
		name: 'Mind The Gap',
		category: 'Intro',
		target: 4,
		par: 3,
		layout: [
			[{ value: 2 }, { value: 2 }],
			[{ isBlock: true }, { isBlock: true }],
			[{ value: 1 }, { value: 1 }],
		],
	},
	{
		name: 'Around the bend',
		category: 'Intro',
		target: 8,
		par: 1,
		layout: [
			[{ value: 1 }, { value: 1 }, { value: 1 }],
			[{ value: 1 }, { isBlock: true }, { value: 1 }],
			[{ value: 1 }, { value: 1 }, { value: 1 }],
		],
	},
	{
		name: 'Mmm',
		category: 'Intro',
		target: 7,
		par: 3,
		layout: [
			[{ value: 1 }, { value: 2 }, { value: 1 }, { value: 2 }, { value: 1 }],
			[
				{ value: 1 },
				{ isBlock: true },
				{ value: 2 },
				{ isBlock: true },
				{ value: 1 },
			],
		],
	},
	{
		name: 'Snakes',
		category: 'Easy',
		target: 10,
		par: 3,
		layout: [
			[
				{ value: 1 },
				{ isBlock: true },
				{ value: 1 },
				{ value: 1 },
				{ value: 3 },
			],
			[
				{ value: 1 },
				{ isBlock: true },
				{ value: 2 },
				{ value: 3 },
				{ value: 3 },
			],
			[
				{ value: 3 },
				{ value: 3 },
				{ value: 2 },
				{ isBlock: true },
				{ value: 1 },
			],
			[
				{ value: 3 },
				{ value: 1 },
				{ value: 1 },
				{ isBlock: true },
				{ value: 1 },
			],
		],
	},
	{
		name: 'Figure Of',
		category: 'Easy',
		target: 8,
		par: 3,
		layout: [
			[{ value: 1 }, { value: 2 }, { value: 1 }],
			[{ value: 2 }, { isBlock: true }, { value: 2 }],
			[{ value: 1 }, { value: 1 }, { value: 4 }],
			[{ value: 2 }, { isBlock: true }, { value: 2 }],
			[{ value: 4 }, { value: 1 }, { value: 1 }],
		],
	},
	{
		name: 'Cut Corners',
		category: 'Easy',
		target: 11,
		par: 3,
		layout: [
			[{ isBlock: true }, { value: 1 }, { value: 2 }, { value: 3 }],
			[{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
			[{ value: 1 }, { value: 2 }, { value: 3 }, { isBlock: true }],
		],
	},
	{
		name: 'The H',
		category: 'Easy',
		target: 8,
		par: 6,
		layout: [
			[{ value: 2 }, { isBlock: true }, { value: 1 }],
			[{ value: 1 }, { isBlock: true }, { value: 1 }],
			[{ value: 1 }, { value: 5 }, { value: 1 }],
			[{ value: 2 }, { isBlock: true }, { value: 2 }],
		],
	},
];
