import type React from 'react';

export type Module = {
	id: string;
	name: string;
	description: string;
	icon: string;
	path: string;
};

export type ProjectCategory = 'experiments' | 'projects' | 'games';

export type ProjectGalleryImage = {
	type: 'image';
	src: string;
	alt: string;
	thumbnailSrc?: string;
	caption?: string;
};

export type ProjectGalleryVideo = {
	type: 'video';
	src: string;
	poster?: string;
	thumbnailSrc?: string;
	title?: string;
	caption?: string;
};

export type ProjectGalleryItem = ProjectGalleryImage | ProjectGalleryVideo;

export type Project<TSlug extends string = string> = {
	slug: TSlug;
	name: string;
	path: string;
	prettyPath: string[];
	primaryColor: string;
	secondaryColor: string;
	categories: ProjectCategory[];
	description?: React.ReactNode | React.ReactNode[];
	previewVideoSrc: string;
	gallery: ProjectGalleryItem[];
};
