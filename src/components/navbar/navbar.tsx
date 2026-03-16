'use client';

import classNames from 'classnames';
import { Check, CheckCheck, Eye, EyeClosed, X } from 'lucide-react';
import { Fragment } from 'react';

import { PROJECT_FILTERS, PROJECTS } from '~/lib/projects';
import type { ProjectCategory } from '~/lib/types';

import styles from './navbar.module.css';
import { Socials } from '../socials';

const DOMAIN = 'haydns.website';

type NavbarProps = {
	activeFilters: ProjectCategory[];
	onToggleFilter: (filter: ProjectCategory) => void;
};

const getRandomBlinkColour = () => {
	const hue = Math.floor(Math.random() * 360);
	const saturation = 72 + Math.floor(Math.random() * 18);
	const lightness = 52 + Math.floor(Math.random() * 12);

	return `hsl(${hue} ${saturation}% ${lightness}%)`;
};

const triggerCharacterAnimation = (element: HTMLSpanElement) => {
	element.classList.remove(styles.characterActive);
	void element.offsetWidth;
	element.classList.add(styles.characterActive);
};

export const Navbar = ({ activeFilters, onToggleFilter }: NavbarProps) => {
	const projectsVisible = PROJECTS.filter((filter) =>
		filter.categories.some((category) => activeFilters.includes(category)),
	).length;

	return (
		<div className="flex flex-col items-center gap-8 px-8 py-16">
			<div className="flex flex-col items-center gap-1">
				<h1 className="text-2xl font-bold md:text-4xl">
					<span className="font-normal opacity-50">https://</span>
					<span
						aria-label={DOMAIN}
						className={styles.domain}
					>
						{DOMAIN.split('').map((character, index) => (
							<span
								key={`${character}-${index}`}
								aria-hidden="true"
								className={`${styles.character} ${index % 2 === 0 ? styles.characterTiltLeft : styles.characterTiltRight}`}
								onMouseEnter={(event) => {
									event.currentTarget.style.setProperty(
										'--blink-colour',
										getRandomBlinkColour(),
									);
									triggerCharacterAnimation(event.currentTarget);
								}}
								onAnimationEnd={(event) => {
									event.currentTarget.classList.remove(styles.characterActive);
								}}
							>
								{character}
							</span>
						))}
					</span>
					<span className="font-normal opacity-50">/</span>
				</h1>
				<div className="inline-flex flex-wrap items-center justify-center gap-2 lg:mt-4">
					<span>a collection of</span>
					<div
						aria-label="Project filters"
						className="inline-flex flex-wrap items-center justify-center gap-2"
						role="group"
					>
						{PROJECT_FILTERS.map((filter, i) => {
							const isActive = activeFilters.includes(filter.value);

							return (
								<Fragment key={filter.value}>
									{i === PROJECT_FILTERS.length - 1 ? (
										<span key="and">and</span>
									) : null}
									<button
										aria-pressed={isActive}
										className={classNames(
											'border-foreground/25 flex cursor-pointer items-center gap-2 rounded-full border px-2 pr-2 transition-colors',
											{
												'bg-foreground text-background': isActive,
											},
										)}
										onClick={() => onToggleFilter(filter.value)}
										type="button"
									>
										{filter.label}
										{isActive ? (
											<Eye className="h-4 w-4" />
										) : (
											<EyeClosed className="h-4 w-4" />
										)}
									</button>
								</Fragment>
							);
						})}
					</div>
				</div>
				<div className="mt-4 text-xs opacity-50">
					Showing {projectsVisible} projects
				</div>
			</div>

			<Socials />
		</div>
	);
};
