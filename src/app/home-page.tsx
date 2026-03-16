'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { startTransition } from 'react';

import { Navbar } from '~/components/navbar';
import { ProjectCard } from '~/components/project-card';
import { ProjectRow } from '~/components/project-row';
import {
	ALL_PROJECT_CATEGORIES,
	isProjectCategory,
	PROJECTS,
} from '~/lib/projects';
import type { ProjectCategory } from '~/lib/types';

const DEFAULT_DESCRIPTION =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const getSelectedFilters = (filterValue: string | null): ProjectCategory[] => {
	if (!filterValue) {
		return ALL_PROJECT_CATEGORIES;
	}

	const selectedFilters = filterValue
		.split(',')
		.map((value) => value.trim())
		.filter(isProjectCategory);

	if (selectedFilters.length === 0) {
		return ALL_PROJECT_CATEGORIES;
	}

	return ALL_PROJECT_CATEGORIES.filter((category) =>
		selectedFilters.includes(category),
	);
};

export const HomePage = () => {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const activeFilters = getSelectedFilters(searchParams.get('filter'));
	const visibleProjects = PROJECTS.filter((project) =>
		project.categories.some((category) => activeFilters.includes(category)),
	);
	const visibleProjectIndexes = new Map(
		visibleProjects.map((project, index) => [project.slug, index]),
	);

	const handleToggleFilter = (filter: ProjectCategory) => {
		const nextFilters = activeFilters.includes(filter)
			? activeFilters.filter((category) => category !== filter)
			: ALL_PROJECT_CATEGORIES.filter((category) =>
					[...activeFilters, filter].includes(category),
				);

		if (nextFilters.length === 0) {
			return;
		}

		const nextSearchParams = new URLSearchParams(searchParams.toString());

		if (nextFilters.length === ALL_PROJECT_CATEGORIES.length) {
			nextSearchParams.delete('filter');
		} else {
			nextSearchParams.set('filter', nextFilters.join(','));
		}

		const nextUrl = nextSearchParams.size
			? `${pathname}?${nextSearchParams.toString()}`
			: pathname;

		startTransition(() => {
			router.replace(nextUrl, { scroll: false });
		});
	};

	return (
		<main
			className="flex min-h-full w-full flex-col items-center gap-16 overflow-hidden pb-20 lg:gap-1"
			style={{
				backgroundColor: 'var(--background)',
				backgroundImage:
					'repeating-linear-gradient(180deg, var(--foreground-faded) 0 1px, transparent 1px 2.5rem)',
				backgroundSize: '100% 2.5rem',
			}}
		>
			<Navbar
				activeFilters={activeFilters}
				onToggleFilter={handleToggleFilter}
			/>

			{PROJECTS.map((project, index) => {
				const visibleIndex = visibleProjectIndexes.get(project.slug);
				const isVisible = visibleIndex !== undefined;
				const displayIndex = visibleIndex ?? 0;
				const align = (visibleIndex ?? index) % 2 === 0 ? 'start' : 'end';

				return (
					<ProjectRow
						key={project.slug}
						align={align}
						displayIndex={displayIndex}
						isFirst={visibleIndex === 0}
						isVisible={isVisible}
					>
						<ProjectCard
							align={align}
							colors={project.colors}
							description={DEFAULT_DESCRIPTION}
							href={project.path}
							link={project.link}
							title={project.name}
							videoUrl={`/modules/${project.slug}.mp4`}
						/>
					</ProjectRow>
				);
			})}
		</main>
	);
};
