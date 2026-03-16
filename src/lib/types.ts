export type Module = {
	id: string;
	name: string;
	description: string;
	icon: string;
	path: string;
};

export type ProjectCategory = 'experiments' | 'projects' | 'games';

export type Project = {
	slug: string;
	name: string;
	path: string;
	link: string[];
	colors: [foreground: string, background: string];
	categories: ProjectCategory[];
};
