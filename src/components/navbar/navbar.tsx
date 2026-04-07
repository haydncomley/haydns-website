'use client';

import classNames from 'classnames';
import { Eye, EyeClosed, Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import { Fragment, useState, useSyncExternalStore } from 'react';

import { useServerThemePreference } from '~/app/providers';
import { PROJECT_FILTERS, PROJECTS } from '~/lib/projects';
import {
	isThemePreference,
	THEME_COOKIE_MAX_AGE,
	THEME_COOKIE_NAME,
	type ThemePreference,
} from '~/lib/theme';
import type { ProjectCategory } from '~/lib/types';

import styles from './navbar.module.css';
import { Socials } from '../socials';

const DOMAIN = 'haydns.website';
const PHRASES = ['Hello, world!', '*yappa-yappa*'];

type NavbarProps = {
	activeFilters: ProjectCategory[];
	onToggleFilter: (filter: ProjectCategory) => void;
};

const getRandomProjectColour = () =>
	PROJECTS[Math.floor(Math.random() * PROJECTS.length)].colors[0];

const getThemePreferenceMediaQuery = () =>
	window.matchMedia('(prefers-color-scheme: dark)');

const getSystemThemePreference = (
	mediaQuery: MediaQueryList,
): ThemePreference => (mediaQuery.matches ? 'dark' : 'light');

const getThemePreferenceOverride = (): ThemePreference | undefined => {
	const { theme } = document.documentElement.dataset;
	return isThemePreference(theme) ? theme : undefined;
};

const saveThemePreference = (themePreference: ThemePreference) => {
	document.cookie = `${THEME_COOKIE_NAME}=${themePreference}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`;
};

const clearThemePreference = () => {
	document.cookie = `${THEME_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
};

const setThemePreferenceOverride = (themePreference: ThemePreference) => {
	document.documentElement.dataset.theme = themePreference;
};

const clearThemePreferenceOverride = () => {
	document.documentElement.removeAttribute('data-theme');
};

const getThemePreferenceSnapshot = (): ThemePreference =>
	getThemePreferenceOverride() ??
	getSystemThemePreference(getThemePreferenceMediaQuery());

const clearRedundantThemePreferenceOverride = () => {
	const themePreferenceOverride = getThemePreferenceOverride();
	const systemThemePreference = getSystemThemePreference(
		getThemePreferenceMediaQuery(),
	);

	if (themePreferenceOverride !== systemThemePreference) {
		return;
	}

	clearThemePreference();
	clearThemePreferenceOverride();
};

const subscribeToThemePreference = (onStoreChange: () => void) => {
	const mediaQuery = getThemePreferenceMediaQuery();
	const observer = new MutationObserver(onStoreChange);
	const handleMediaQueryChange = () => {
		clearRedundantThemePreferenceOverride();
		onStoreChange();
	};

	mediaQuery.addEventListener('change', handleMediaQueryChange);
	observer.observe(document.documentElement, {
		attributeFilter: ['data-theme'],
		attributes: true,
	});

	return () => {
		mediaQuery.removeEventListener('change', handleMediaQueryChange);
		observer.disconnect();
	};
};

const useThemePreference = () => {
	const serverThemePreference = useServerThemePreference();

	return useSyncExternalStore(
		subscribeToThemePreference,
		getThemePreferenceSnapshot,
		() => serverThemePreference ?? 'light',
	);
};

const triggerCharacterAnimation = (element: HTMLSpanElement) => {
	element.classList.remove(styles.characterActive);
	void element.offsetWidth;
	element.classList.add(styles.characterActive);
};

export const Navbar = ({ activeFilters, onToggleFilter }: NavbarProps) => {
	const themePreference = useThemePreference();
	const [phraseIndex, setPhraseIndex] = useState(0);
	const phrase = PHRASES[phraseIndex];
	const projectsVisible = PROJECTS.filter((filter) =>
		filter.categories.some((category) => activeFilters.includes(category)),
	).length;
	const isDarkMode = themePreference === 'dark';

	const handleToggleThemePreference = () => {
		const mediaQuery = getThemePreferenceMediaQuery();
		const systemThemePreference = getSystemThemePreference(mediaQuery);
		const nextThemePreference = isDarkMode ? 'light' : 'dark';

		if (nextThemePreference === systemThemePreference) {
			clearThemePreference();
			clearThemePreferenceOverride();
			return;
		}

		saveThemePreference(nextThemePreference);
		setThemePreferenceOverride(nextThemePreference);
	};

	return (
		<div className="flex flex-col items-center gap-2 px-8 py-16">
			<div className="flex flex-col items-center gap-1">
				<div
					className="group flex cursor-pointer items-center transition-transform active:scale-90"
					onClick={() => {
						setPhraseIndex((index) => {
							const nextIndex = index + 1;
							return nextIndex >= PHRASES.length ? 0 : nextIndex;
						});
					}}
				>
					<div className="relative flex aspect-square h-24 origin-bottom items-center transition-transform group-hover:-translate-x-4 group-hover:-rotate-12">
						<Image
							src="/face.png"
							alt="A picture of me (Haydn Comley)!"
							fill
							className="group-hover:hidden group-active:block"
						/>
						<Image
							src="/face-open.png"
							alt="A picture of me (Haydn Comley)!"
							fill
							className="hidden group-hover:block group-active:hidden"
						/>

						<div className="bg-primary text-primary-foreground absolute origin-bottom-left translate-x-24 -translate-y-4 scale-50 rotate-24 rounded-2xl rounded-bl-sm px-2 py-1 text-xs font-bold whitespace-nowrap opacity-0 transition-all group-hover:scale-110 group-hover:rotate-8 group-hover:opacity-100 group-active:rotate-24 group-active:opacity-0">
							{phrase}
						</div>
					</div>
				</div>
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
										getRandomProjectColour(),
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

			<button
				aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
				aria-pressed={isDarkMode}
				className={classNames(
					'border-foreground/25 fixed top-8 right-8 z-50 flex cursor-pointer items-center gap-2 rounded-full border p-2 text-sm transition-all hover:scale-110 hover:rotate-12 active:scale-95',
					{
						'bg-foreground text-background': isDarkMode,
						'bg-background text-foreground': !isDarkMode,
					},
				)}
				onClick={handleToggleThemePreference}
				type="button"
			>
				{isDarkMode ? (
					<Moon className="h-6 w-6" />
				) : (
					<Sun className="h-6 w-6" />
				)}
			</button>
		</div>
	);
};
