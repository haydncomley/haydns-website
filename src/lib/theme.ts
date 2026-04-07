export const THEME_COOKIE_NAME = 'theme';
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export type ThemePreference = 'light' | 'dark';

export const isThemePreference = (
	value: string | undefined,
): value is ThemePreference => value === 'light' || value === 'dark';
