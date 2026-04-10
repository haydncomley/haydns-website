'use client';

import classNames from 'classnames';
import { Eye, EyeClosed, Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import {
	type CSSProperties,
	Fragment,
	useEffect,
	useRef,
	useState,
	useSyncExternalStore,
} from 'react';

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
const DOMAIN_PREFIX = 'https://';
const PHRASES = [
	'Hey there!',
	'*yappa-yappa*',
	'Hello, world.',
	'你好',
	'Welcome to my website',
];
const FACE_PHRASE_INITIAL_DELAY_MS = 2500;
const FACE_PHRASE_VISIBLE_MS = 1000;
const FACE_PHRASE_INITIAL_VISIBLE_MS = 1000;
const NAVBAR_INTRO_START_DELAY_MS = 80;
const NAVBAR_CONTENT_INTRO_DURATION_MS = 420;
const NAVBAR_PREFIX_CHARACTER_DELAY_MS = 20;
const NAVBAR_DOMAIN_CHARACTER_DELAY_MS = 20;
const NAVBAR_PREFIX_START_DELAY_MS = 120;
const NAVBAR_PREFIX_TO_DOMAIN_GAP_MS = 90;
const NAVBAR_DOMAIN_START_DELAY_MS =
	NAVBAR_PREFIX_START_DELAY_MS +
	(DOMAIN_PREFIX.length - 1) * NAVBAR_PREFIX_CHARACTER_DELAY_MS +
	NAVBAR_PREFIX_TO_DOMAIN_GAP_MS;
const NAVBAR_TRAILING_SLASH_DELAY_MS =
	NAVBAR_DOMAIN_START_DELAY_MS +
	DOMAIN.length * NAVBAR_DOMAIN_CHARACTER_DELAY_MS;
const NAVBAR_DESCRIPTION_DELAY_MS = NAVBAR_TRAILING_SLASH_DELAY_MS + 160;
const NAVBAR_PROJECT_COUNT_DELAY_MS = NAVBAR_DESCRIPTION_DELAY_MS + 100;
const NAVBAR_SOCIALS_DELAY_MS = NAVBAR_PROJECT_COUNT_DELAY_MS + 120;
const NAVBAR_INTRO_TOTAL_DURATION_MS =
	NAVBAR_SOCIALS_DELAY_MS + NAVBAR_CONTENT_INTRO_DURATION_MS;

const getIntroDelayStyle = (delayMs: number): CSSProperties =>
	({
		'--intro-delay': `${delayMs}ms`,
	}) as CSSProperties;

type NavbarProps = {
	activeFilters: ProjectCategory[];
	onToggleFilter: (filter: ProjectCategory) => void;
};

const getRandomProjectColour = () =>
	PROJECTS[Math.floor(Math.random() * PROJECTS.length)].primaryColor;

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
	const facePhraseIntroTimeoutRef = useRef<number | null>(null);
	const facePhraseTimeoutRef = useRef<number | null>(null);
	const navbarIntroFrameRef = useRef<number | null>(null);
	const navbarIntroTimeoutRef = useRef<number | null>(null);
	const navbarIntroCompleteTimeoutRef = useRef<number | null>(null);
	const [isFaceActive, setIsFaceActive] = useState(false);
	const [isNavbarIntroActive, setIsNavbarIntroActive] = useState(false);
	const [isNavbarIntroVisible, setIsNavbarIntroVisible] = useState(false);
	const [phraseIndex, setPhraseIndex] = useState(0);
	const phrase = PHRASES[phraseIndex];
	const projectsVisible = PROJECTS.filter((filter) =>
		filter.categories.some((category) => activeFilters.includes(category)),
	).length;
	const isDarkMode = themePreference === 'dark';

	useEffect(
		() => () => {
			if (navbarIntroFrameRef.current) {
				cancelAnimationFrame(navbarIntroFrameRef.current);
			}

			if (navbarIntroTimeoutRef.current) {
				clearTimeout(navbarIntroTimeoutRef.current);
			}

			if (navbarIntroCompleteTimeoutRef.current) {
				clearTimeout(navbarIntroCompleteTimeoutRef.current);
			}

			if (facePhraseIntroTimeoutRef.current) {
				clearTimeout(facePhraseIntroTimeoutRef.current);
			}

			if (facePhraseTimeoutRef.current) {
				clearTimeout(facePhraseTimeoutRef.current);
			}
		},
		[],
	);

	useEffect(() => {
		navbarIntroFrameRef.current = window.requestAnimationFrame(() => {
			navbarIntroTimeoutRef.current = window.setTimeout(() => {
				setIsNavbarIntroVisible(true);
				setIsNavbarIntroActive(true);
				navbarIntroTimeoutRef.current = null;

				navbarIntroCompleteTimeoutRef.current = window.setTimeout(() => {
					setIsNavbarIntroActive(false);
					navbarIntroCompleteTimeoutRef.current = null;
				}, NAVBAR_INTRO_TOTAL_DURATION_MS);
			}, NAVBAR_INTRO_START_DELAY_MS);
		});

		return () => {
			if (!navbarIntroFrameRef.current) {
				return;
			}

			cancelAnimationFrame(navbarIntroFrameRef.current);
			navbarIntroFrameRef.current = null;

			if (navbarIntroTimeoutRef.current) {
				clearTimeout(navbarIntroTimeoutRef.current);
				navbarIntroTimeoutRef.current = null;
			}

			if (navbarIntroCompleteTimeoutRef.current) {
				clearTimeout(navbarIntroCompleteTimeoutRef.current);
				navbarIntroCompleteTimeoutRef.current = null;
			}
		};
	}, []);

	useEffect(() => {
		facePhraseIntroTimeoutRef.current = window.setTimeout(() => {
			showFacePhrase(true, FACE_PHRASE_INITIAL_VISIBLE_MS);
			facePhraseIntroTimeoutRef.current = null;
		}, FACE_PHRASE_INITIAL_DELAY_MS);

		return () => {
			if (!facePhraseIntroTimeoutRef.current) {
				return;
			}

			clearTimeout(facePhraseIntroTimeoutRef.current);
			facePhraseIntroTimeoutRef.current = null;
		};
	}, []);

	const clearFacePhraseIntroTimeout = () => {
		if (!facePhraseIntroTimeoutRef.current) {
			return;
		}

		clearTimeout(facePhraseIntroTimeoutRef.current);
		facePhraseIntroTimeoutRef.current = null;
	};

	const clearFacePhraseTimeout = () => {
		if (!facePhraseTimeoutRef.current) {
			return;
		}

		clearTimeout(facePhraseTimeoutRef.current);
		facePhraseTimeoutRef.current = null;
	};

	const showFacePhrase = (
		autoHide = false,
		autoHideDelayMs = FACE_PHRASE_VISIBLE_MS,
	) => {
		clearFacePhraseIntroTimeout();
		clearFacePhraseTimeout();
		setIsFaceActive(true);

		if (!autoHide) {
			return;
		}

		facePhraseTimeoutRef.current = window.setTimeout(() => {
			setIsFaceActive(false);
			facePhraseTimeoutRef.current = null;
		}, autoHideDelayMs);
	};

	const hideFacePhrase = () => {
		clearFacePhraseIntroTimeout();
		clearFacePhraseTimeout();
		setIsFaceActive(false);
	};

	const handleFaceClick = () => {
		setPhraseIndex((index) => (index + 1 >= PHRASES.length ? 0 : index + 1));

		showFacePhrase(
			!window.matchMedia('(hover: hover) and (pointer: fine)').matches,
		);
	};

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
				<button
					className={classNames(
						'group flex cursor-pointer items-center transition-transform active:scale-90',
						styles.faceIntro,
						styles.introActive,
					)}
					onBlur={hideFacePhrase}
					onClick={handleFaceClick}
					onFocus={() => showFacePhrase()}
					onPointerEnter={(event) => {
						if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
							showFacePhrase();
						}
					}}
					onPointerLeave={(event) => {
						if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
							hideFacePhrase();
						}
					}}
					type="button"
				>
					<div
						className={classNames(
							'relative flex aspect-square h-24 origin-bottom items-center transition-transform',
							{
								'-translate-x-4 -rotate-12': isFaceActive,
							},
						)}
					>
						<Image
							src="/face.png"
							alt="A picture of me (Haydn Comley)!"
							fill
							className={classNames('group-active:block!', {
								hidden: isFaceActive,
							})}
						/>
						<Image
							src="/face-open.png"
							alt=""
							aria-hidden="true"
							fill
							priority
							className={classNames('group-active:hidden', {
								hidden: !isFaceActive,
							})}
						/>

						<div
							className={classNames(
								'bg-primary text-primary-foreground absolute origin-bottom-left translate-x-24 -translate-y-4 rounded-2xl rounded-bl-sm px-2 py-1 text-xs font-bold whitespace-nowrap transition-all',
								{
									'scale-110 rotate-8 opacity-100': isFaceActive,
									'scale-50 rotate-24 opacity-0': !isFaceActive,
								},
							)}
						>
							{phrase}
						</div>
					</div>
				</button>
				<h1 className="text-2xl font-bold md:text-4xl">
					<span
						aria-hidden="true"
						className={classNames(styles.domain, styles.domainIntro, {
							[styles.introActive]: isNavbarIntroActive,
							[styles.introVisible]: isNavbarIntroVisible,
						})}
					>
						{DOMAIN_PREFIX.split('').map((character, index) => (
							<span
								key={`prefix-${character}-${index}`}
								aria-hidden="true"
								className={classNames(styles.character, styles.characterIntro, {
									'font-normal': true,
									[styles.introActive]: isNavbarIntroActive,
									[styles.introVisible]: isNavbarIntroVisible,
									[styles.characterMuted]: true,
									[styles.characterTiltLeft]: index % 2 === 0,
									[styles.characterTiltRight]: index % 2 !== 0,
								})}
								style={getIntroDelayStyle(
									NAVBAR_PREFIX_START_DELAY_MS +
										index * NAVBAR_PREFIX_CHARACTER_DELAY_MS,
								)}
							>
								{character}
							</span>
						))}
					</span>
					<span
						aria-label={DOMAIN}
						className={classNames(styles.domain, styles.domainIntro, {
							[styles.introActive]: isNavbarIntroActive,
							[styles.introVisible]: isNavbarIntroVisible,
						})}
					>
						{DOMAIN.split('').map((character, index) => (
							<span
								key={`${character}-${index}`}
								aria-hidden="true"
								className={classNames(styles.character, styles.characterIntro, {
									[styles.introActive]: isNavbarIntroActive,
									[styles.introVisible]: isNavbarIntroVisible,
									[styles.characterTiltLeft]: index % 2 === 0,
									[styles.characterTiltRight]: index % 2 !== 0,
								})}
								style={getIntroDelayStyle(
									NAVBAR_DOMAIN_START_DELAY_MS +
										index * NAVBAR_DOMAIN_CHARACTER_DELAY_MS,
								)}
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
					<span
						aria-hidden="true"
						className={classNames(styles.domain, styles.domainIntro, {
							[styles.introActive]: isNavbarIntroActive,
							[styles.introVisible]: isNavbarIntroVisible,
						})}
					>
						<span
							aria-hidden="true"
							className={classNames(
								styles.character,
								styles.characterIntro,
								'font-normal',
								{
									[styles.introActive]: isNavbarIntroActive,
									[styles.introVisible]: isNavbarIntroVisible,
									[styles.characterMuted]: true,
									[styles.characterTiltLeft]: DOMAIN.length % 2 === 0,
									[styles.characterTiltRight]: DOMAIN.length % 2 !== 0,
								},
							)}
							style={getIntroDelayStyle(NAVBAR_TRAILING_SLASH_DELAY_MS)}
						>
							/
						</span>
					</span>
				</h1>
				<div
					className={classNames(
						'inline-flex flex-wrap items-center justify-center gap-2 lg:mt-4',
						styles.descriptionIntro,
						{
							[styles.introActive]: isNavbarIntroActive,
							[styles.introVisible]: isNavbarIntroVisible,
						},
					)}
					style={getIntroDelayStyle(NAVBAR_DESCRIPTION_DELAY_MS)}
				>
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
											'border-foreground/25 flex cursor-pointer items-center gap-2 rounded-full border px-2 pr-2 transition-all hover:scale-108 odd:hover:-rotate-3 even:hover:rotate-3 active:scale-95',
											{
												'bg-background': !isActive,
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
				<div
					className={classNames(
						'mt-4 text-xs opacity-50',
						styles.projectCountIntro,
						{
							[styles.introActive]: isNavbarIntroActive,
							[styles.introVisible]: isNavbarIntroVisible,
						},
					)}
					style={getIntroDelayStyle(NAVBAR_PROJECT_COUNT_DELAY_MS)}
				>
					Showing {projectsVisible} projects
				</div>
			</div>

			<div
				className={classNames(styles.socialsIntro, {
					[styles.introActive]: isNavbarIntroActive,
					[styles.introVisible]: isNavbarIntroVisible,
				})}
				style={getIntroDelayStyle(NAVBAR_SOCIALS_DELAY_MS)}
			>
				<Socials />
			</div>

			<button
				aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
				aria-pressed={isDarkMode}
				className={classNames(
					'bg-background text-foreground dark:bg-foreground dark:text-background border-foreground/25 fixed top-8 right-8 z-50 flex cursor-pointer items-center gap-2 rounded-full border p-2 text-sm transition-all hover:scale-110 hover:rotate-12 active:scale-95',
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
