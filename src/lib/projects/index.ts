import type { ProjectCategory } from '../types';
import { aiStreamAssistantProject } from './ai-stream-assistant';
import { chatgptCloneProject } from './chatgpt-clone';
import { dailyWordGameProject } from './daily-word-game';
import { gamingDashboardProject } from './gaming-dashboard';
import { getCardsProject } from './get-cards';
import { marketingPortfolioProject } from './marketing-portfolio';
import { numberChainProject } from './number-chain';
import { physicsTypeProject } from './physics-type';
import { samPlantProject } from './sam-plant';
import { tubeGameProject } from './tube-game';
import { vinylViewerProject } from './vinyl-viewer';

export const ALL_PROJECT_CATEGORIES: ProjectCategory[] = [
	'experiments',
	'projects',
	'games',
];

export const PROJECT_FILTERS: Array<{
	label: string;
	value: ProjectCategory;
}> = [
	{ label: 'projects', value: 'projects' },
	{ label: 'experiments', value: 'experiments' },
	{ label: 'games', value: 'games' },
];

export const isProjectCategory = (value: string): value is ProjectCategory =>
	ALL_PROJECT_CATEGORIES.includes(value as ProjectCategory);

export const PROJECTS = [
	gamingDashboardProject,
	aiStreamAssistantProject,
	getCardsProject,
	samPlantProject,
	tubeGameProject,
	marketingPortfolioProject,
	dailyWordGameProject,
	numberChainProject,
	physicsTypeProject,
	chatgptCloneProject,
	vinylViewerProject,
] as const;

export type ProjectSlug = (typeof PROJECTS)[number]['slug'];

const ALL_PROJECT_SLUGS = PROJECTS.map((project) => project.slug);

export const isProjectSlug = (value: string): value is ProjectSlug =>
	ALL_PROJECT_SLUGS.includes(value as ProjectSlug);
