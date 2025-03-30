import type { ILevel } from './types';

export const LEVELS: ILevel[] = [
	{
		name: 'Intro',
		target: 2,
		par: 1,
		layout: [[{ value: 1 }, { value: 1 }]],
	},
	{
		name: 'Intro (2)',
		target: 4,
		par: 2,
		layout: [[{ value: 2 }, { value: 2 }, { value: 2 }, { value: 2 }]],
	},
	{
		name: 'Intro (3)',
		target: 6,
		par: 2,
		layout: [
			[{ value: 2 }, { value: 2 }],
			[{ value: 2 }, { value: 2 }],
			[{ value: 2 }, { value: 2 }],
		],
	},
	{
		name: 'Intro (4)',
		target: 4,
		par: 3,
		layout: [
			[{ value: 1 }, { value: 3 }, { value: 1 }],
			[{ value: 3 }, { value: 1 }, { value: 3 }],
		],
	},
	{
		name: 'Intro (5)',
		target: 6,
		par: 2,
		layout: [
			[{ value: 1 }, { value: 2 }],
			[{ value: 3 }, { value: 3 }],
			[{ value: 1 }, { value: 2 }],
		],
	},
	{
		name: 'Intro (6)',
		target: 2,
		par: 2,
		layout: [
			[{ value: 1 }, { value: 1 }],
			[{ isBlock: true }, { isBlock: true }],
			[{ value: 1 }, { value: 1 }],
		],
	},
	{
		name: 'Intro (7)',
		target: 8,
		par: 1,
		layout: [
			[{ value: 1 }, { value: 1 }, { value: 1 }],
			[{ value: 1 }, { isBlock: true }, { value: 1 }],
			[{ value: 1 }, { value: 1 }, { value: 1 }],
		],
	},
	{
		name: 'Intro (8)',
		target: 4,
		par: 2,
		layout: [
			[{ value: 1 }, { isBlock: true }],
			[{ value: 1 }, { value: 1 }],
			[{ isBlock: true }, { value: 1 }],
			[{ isBlock: true }, { isBlock: true }],
			[{ value: 2 }, { value: 2 }],
		],
	},
	{
		name: 'Easy (1)',
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
];
