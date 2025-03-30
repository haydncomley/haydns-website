export type Vec2 = {
	x: number;
	y: number;
};

export type ILevel = {
	name: string;
	target: number;
	par: number;
	layout: ILevelBlock[][];
};

export type ILevelBlock = {
	isDone?: boolean;
	isBlock?: boolean;
	value?: number;
} & (
	| {
			value?: number;
	  }
	| {
			value: number;
	  }
);
