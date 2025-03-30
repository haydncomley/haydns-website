import { Bodies } from 'matter-js';

export const A = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 2, bodySize / 2),

	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 2, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 4, bodySize / 2),
];

export const B = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 3, bodySize / 2),
];

export const C = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 3, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 4, bodySize / 2),
];

export const D = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 3, bodySize / 2),
];

export const E = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 4, bodySize / 2),
];

export const F = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 2, bodySize / 2),

	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 2, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 0, bodySize / 2),
];

export const G = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 3, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 4, bodySize / 2),
];

export const H = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 2, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 4, bodySize / 2),
];

export const I = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 4, bodySize / 2),
];

export const J = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 0, bodySize / 2),
];

export const K = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 2, bodySize / 2),

	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 3, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 4, bodySize / 2),
];

export const L = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 4, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 4, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 4, bodySize / 2),
];

export const M = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 1, bodySize / 2),

	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 2, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 1, bodySize / 2),

	Bodies.circle(centerX + bodySize * 4, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 4, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 4, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 4, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 4, centerY + bodySize * 4, bodySize / 2),
];

export const N = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 3, bodySize / 2),

	Bodies.circle(centerX + bodySize * 4, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 4, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 4, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 4, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 4, centerY + bodySize * 4, bodySize / 2),
];

export const O = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 3, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 3, bodySize / 2),
];

export const P = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 2, bodySize / 2),

	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 2, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 1, bodySize / 2),
];

export const Q = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 3, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 3, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 4, bodySize / 2),
];

export const R = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 2, bodySize / 2),

	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 3, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 4, bodySize / 2),
];

export const S = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 3, bodySize / 2),
];

export const T = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 0, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1.5, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1.5, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1.5, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1.5, centerY + bodySize * 4, bodySize / 2),
];

export const U = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 3, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 4, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 3, bodySize / 2),
];

export const V = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 2, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 3, bodySize / 2),

	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 3, bodySize / 2),

	Bodies.circle(centerX + bodySize * 4, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 4, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 4, centerY + bodySize * 2, bodySize / 2),
];

export const W = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 3, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 3, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 4, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 4, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 4, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 4, centerY + bodySize * 3, bodySize / 2),
];

export const X = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 3, bodySize / 2),

	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 2, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 3, bodySize / 2),

	Bodies.circle(centerX + bodySize * 4, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 4, centerY + bodySize * 4, bodySize / 2),
];

export const Y = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 1, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 2, bodySize / 2),

	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 2, bodySize / 2),

	Bodies.circle(centerX + bodySize * 4, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 4, centerY + bodySize * 1, bodySize / 2),
];

export const Z = (centerX: number, centerY: number, bodySize: number) => [
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 0, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 3, bodySize / 2),
	Bodies.circle(centerX + bodySize * 1, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 2, bodySize / 2),
	Bodies.circle(centerX + bodySize * 2, centerY + bodySize * 4, bodySize / 2),

	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 0, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 1, bodySize / 2),
	Bodies.circle(centerX + bodySize * 3, centerY + bodySize * 4, bodySize / 2),
];
