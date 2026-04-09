import type { Project, ProjectCategory, ProjectGalleryItem } from '../types';

type CreateProjectArgs<TSlug extends string> = {
	slug: TSlug;
	name: string;
	path: string;
	prettyPath: string[];
	primaryColor: string;
	secondaryColor: string;
	categories: ProjectCategory[];
	description?: Project['description'];
	gallery: ProjectGalleryItem[];
};

const getProjectPreviewVideo = (slug: string) => `/modules/${slug}/cover.webm`;

export const createProject = <TSlug extends string>({
	slug,
	name,
	path,
	prettyPath,
	primaryColor,
	secondaryColor,
	categories,
	description,
	gallery,
}: CreateProjectArgs<TSlug>): Project<TSlug> => ({
	slug,
	name,
	path,
	prettyPath,
	primaryColor,
	secondaryColor,
	categories,
	description,
	previewVideoSrc: getProjectPreviewVideo(slug),
	gallery,
});
