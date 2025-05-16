export type Vec2 = {
	x: number;
	y: number;
};

export type ILevel = {
	name: string;
	target: number;
	par: number;
	layout: ILevelBlock[][];
	category: string;
};

export type ILevelBlock = {
	isDone?: boolean;
	isBlock?: boolean;
	value?: number;
	operation?: 'double';
	connectedDir?: Vec2;
};

export const OPERATION_LABELS: Record<
	NonNullable<ILevelBlock['operation']>,
	string
> = {
	double: 'x2',
};
