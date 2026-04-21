'use client';

import { usePathname, useRouter } from 'next/navigation';
import { startTransition, useEffect, useRef, useState } from 'react';

import { Navbar } from '~/components/navbar';
import { ProjectCard } from '~/components/project-card';
import { ProjectPreview } from '~/components/project-preview';
import { ProjectRow } from '~/components/project-row';
import { ALL_PROJECT_CATEGORIES, PROJECTS } from '~/lib/projects';
import type { Project, ProjectCategory } from '~/lib/types';

const PARALLAX_SPEED = 0.5; // Background scrolls at this rate relative to content

export type HomePageProps = {
	initialActiveFilters: ProjectCategory[];
	initialSelectedProjectSlug: Project['slug'] | null;
};

export const HomePage = ({
	initialActiveFilters,
	initialSelectedProjectSlug,
}: HomePageProps) => {
	const mainRef = useRef<HTMLElement>(null);
	const pathname = usePathname();
	const router = useRouter();
	const [activeFilters, setActiveFilters] =
		useState<ProjectCategory[]>(initialActiveFilters);
	const initialActiveFiltersKey = initialActiveFilters.join(',');
	const selectedProject =
		PROJECTS.find((project) => project.slug === initialSelectedProjectSlug) ??
		null;
	const visibleProjects = PROJECTS.filter((project) =>
		project.categories.some((category) => activeFilters.includes(category)),
	);
	const visibleProjectIndexes = new Map(
		visibleProjects.map((project, index) => [project.slug, index]),
	);

	useEffect(() => {
		setActiveFilters(initialActiveFilters);
	}, [initialActiveFiltersKey]);

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

	const updateUrl = (
		mutateSearchParams: (searchParams: URLSearchParams) => void,
		mode: 'push' | 'replace' = 'replace',
	) => {
		const nextSearchParams = new URLSearchParams(window.location.search);
		mutateSearchParams(nextSearchParams);

		const nextUrl = nextSearchParams.size
			? `${pathname}?${nextSearchParams.toString()}`
			: pathname;

		startTransition(() => {
			if (mode === 'push') {
				router.push(nextUrl, { scroll: false });
				return;
			}

			router.replace(nextUrl, { scroll: false });
		});
	};

	const handleToggleFilter = (filter: ProjectCategory) => {
		const nextFilters = activeFilters.includes(filter)
			? activeFilters.filter((category) => category !== filter)
			: ALL_PROJECT_CATEGORIES.filter((category) =>
					[...activeFilters, filter].includes(category),
				);

		if (nextFilters.length === 0) {
			return;
		}

		setActiveFilters(nextFilters);

		updateUrl((nextSearchParams) => {
			if (nextFilters.length === ALL_PROJECT_CATEGORIES.length) {
				nextSearchParams.delete('filter');
				return;
			}

			nextSearchParams.set('filter', nextFilters.join(','));
		});
	};

	const handleOpenProject = (projectSlug: Project['slug']) => {
		updateUrl((nextSearchParams) => {
			nextSearchParams.set('project', projectSlug);
		}, 'push');
	};

	const handleCloseProject = () => {
		updateUrl((nextSearchParams) => {
			nextSearchParams.delete('project');
		});
	};

	return (
		<>
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
								description={project.description}
								href={project.path}
								onOpen={() => handleOpenProject(project.slug)}
								prettyPath={project.prettyPath}
								primaryColor={project.primaryColor}
								secondaryColor={project.secondaryColor}
								title={project.name}
								videoUrl={project.previewVideoSrc}
								category={project.categories[0]}
							/>
						</ProjectRow>
					);
				})}
			</main>

			{selectedProject ? (
				<ProjectPreview
					project={selectedProject}
					onClose={handleCloseProject}
				/>
			) : null}
		</>
	);
};
