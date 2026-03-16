import { ALL_PROJECT_CATEGORIES, isProjectCategory } from './projects';
import type { ProjectCategory } from './types';

export type PageSearchParams = Record<string, string | string[] | undefined>;

const getSearchParamValue = (value: string | string[] | undefined) =>
	Array.isArray(value) ? value[0] : value;

export const getSelectedFilters = (
	filterValue: string | string[] | undefined,
): ProjectCategory[] => {
	const normalizedFilterValue = getSearchParamValue(filterValue);

	if (!normalizedFilterValue) {
		return ALL_PROJECT_CATEGORIES;
	}

	const selectedFilters = normalizedFilterValue
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

const isTruthySearchParam = (value: string | string[] | undefined) => {
	const normalizedValue = getSearchParamValue(value);

	if (normalizedValue === undefined) {
		return false;
	}

	return normalizedValue !== 'false' && normalizedValue !== '0';
};

export const getNumberChainQueryState = (searchParams: PageSearchParams) => {
	const levelValue = getSearchParamValue(searchParams.level);
	const parsedLevel = levelValue ? Number(levelValue) : NaN;

	return {
		currentLevel:
			Number.isInteger(parsedLevel) && parsedLevel > 0 ? parsedLevel : null,
		viewingAllLevels: isTruthySearchParam(searchParams.allLevels),
	};
};
