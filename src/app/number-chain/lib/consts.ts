import type { ILevel } from './types';

export const LEVELS: ILevel[] = [
	{
		name: 'Intro',
		category: 'Introduction',
		target: 2,
		par: 1,
		layout: [[{ value: 1 }, { value: 1 }]],
	},
	{
		name: 'Level Two',
		category: 'Introduction',
		target: 4,
		par: 2,
		layout: [[{ value: 2 }, { value: 2 }, { value: 2 }, { value: 2 }]],
	},
	{
		name: 'Threes',
		category: 'Introduction',
		target: 6,
		par: 2,
		layout: [
			[{ value: 2 }, { value: 2 }],
			[{ value: 2 }, { value: 2 }],
			[{ value: 2 }, { value: 2 }],
		],
	},
	{
		name: 'Par Four',
		category: 'Introduction',
		target: 4,
		par: 4,
		layout: [
			[{ value: 3 }, { value: 2 }, { value: 1 }],
			[{ value: 1 }, { value: 1 }, { value: 1 }],
			[{ value: 1 }, { value: 3 }, { value: 3 }],
		],
	},
	{
		name: 'Mind The Gap',
		category: 'Introduction',
		target: 2,
		par: 2,
		layout: [
			[{ value: 1 }, { value: 1 }],
			[{ isBlock: true }, { isBlock: true }],
			[{ value: 1 }, { value: 1 }],
		],
	},
	{
		name: 'Roundabout',
		category: 'Introduction',
		target: 8,
		par: 1,
		layout: [
			[{ value: 1 }, { value: 1 }, { value: 1 }],
			[{ value: 1 }, { isBlock: true }, { value: 1 }],
			[{ value: 1 }, { value: 1 }, { value: 1 }],
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
];
