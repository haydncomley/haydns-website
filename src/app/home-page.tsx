'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { startTransition, useEffect, useRef } from 'react';

import { Navbar } from '~/components/navbar';
import { ProjectCard } from '~/components/project-card';
import { ProjectRow } from '~/components/project-row';
import {
	ALL_PROJECT_CATEGORIES,
	isProjectCategory,
	PROJECTS,
} from '~/lib/projects';
import type { ProjectCategory } from '~/lib/types';

const PARALLAX_SPEED = 0.5; // Background scrolls at this rate relative to content

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
	const mainRef = useRef<HTMLElement>(null);
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

	useEffect(() => {
		let ticking = false;

		const updateBackground = () => {
			if (mainRef.current) {
				const scrollY = window.scrollY;
				mainRef.current.style.backgroundPositionY = `${scrollY * PARALLAX_SPEED}px`;
			}
			ticking = false;
		};

		const handleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(updateBackground);
				ticking = true;
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

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
			ref={mainRef}
			className="flex min-h-full w-full flex-col items-center overflow-hidden pb-20"
			style={{
				backgroundColor: 'var(--background)',
				backgroundImage:
					'repeating-linear-gradient(180deg, var(--foreground-faded) 0 1px, transparent 1px 2.5rem)',
				backgroundSize: '100% 2.5rem',
				willChange: 'background-position',
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
							description={project.description}
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
