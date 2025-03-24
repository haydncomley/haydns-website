'use client';

import classNames from 'classnames';
import {
	Bodies,
	Body,
	Composite,
	Constraint,
	Engine,
	MouseConstraint,
	Render,
	Runner,
} from 'matter-js';
import { useEffect, useRef } from 'react';
import seedColour from 'seed-color';

import * as Keys from './lib/consts';
import styles from './physics-type.module.css';

export const SPECIAL_WORDS = [
	{
		world: 'haydn',
		foreground: '#ff0062',
		background: '#1b1b1b',
	},
	{
		world: 'comley',
		foreground: '#1b1b1b',
		background: '#ff0062',
	},
	{
		world: 'Matter',
		foreground: '#75f09b',
		background: '#4c5562',
	},
	{
		world: 'NOTHING',
		foreground: '#C8102E',
		background: '#fff',
	},
	{
		world: 'SOMETHING',
		foreground: '#C8102E',
		background: '#000',
	},
	{
		world: 'ClearScore',
		foreground: '#275053',
		background: '#eaf5f5',
	},
];

export const PhysicsTypeGame = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const wordGroupsRef = useRef<Matter.Body[][]>([]);
	const lastLettersRef = useRef<string>('');

	useEffect(() => {
		if (!canvasRef.current) return;
		const abortController = new AbortController();
		const signal = abortController.signal;

		let centerX = window.innerWidth / 2;
		let centerY = window.innerHeight / 2;
		const bodySize = 20;

		let currentX = centerX * 0.2;

		const engine = Engine.create();
		const render = Render.create({
			canvas: canvasRef.current,
			engine: engine,
			options: {
				wireframes: false,
				background: 'transparent',
			},
		});
		engine.gravity = {
			scale: 0.001,
			x: 0,
			y: 0.75,
		};

		const borderLeft = Bodies.rectangle(
			(-bodySize * 5) / 2,
			centerY,
			bodySize * 5,
			window.innerHeight,
			{
				isStatic: true,
				render: {
					visible: false,
				},
			},
		);
		const borderRight = Bodies.rectangle(
			window.innerWidth + (bodySize * 5) / 2,
			centerY,
			bodySize * 5,
			window.innerHeight,
			{
				isStatic: true,
				render: {
					visible: false,
				},
			},
		);
		const borderTop = Bodies.rectangle(
			centerX,
			(-bodySize * 5) / 2,
			window.innerWidth,
			bodySize * 5,
			{
				isStatic: true,
				render: {
					visible: false,
				},
			},
		);
		const borderBottom = Bodies.rectangle(
			centerX,
			window.innerHeight + (bodySize * 5) / 2,
			window.innerWidth,
			bodySize * 5,
			{
				isStatic: true,
				render: {
					visible: false,
				},
			},
		);

		const resizeCanvas = () => {
			if (!canvasRef.current) return;
			canvasRef.current.width = window.innerWidth;
			canvasRef.current.height = window.innerHeight;
			console.log('Resize');
			Body.setPosition(borderRight, {
				x: window.innerWidth + (bodySize * 5) / 2,
				y: centerY + (bodySize * 5) / 2,
			});
			Body.setPosition(borderLeft, {
				x: (-bodySize * 5) / 2,
				y: centerY + (bodySize * 5) / 2,
			});
			Body.setPosition(borderTop, {
				x: centerX,
				y: (-bodySize * 5) / 2,
			});
			Body.setPosition(borderBottom, {
				x: centerX,
				y: window.innerHeight + (bodySize * 5) / 2,
			});
			centerX = window.innerWidth / 2;
			centerY = window.innerHeight / 2;
		};

		const mouseConstraint = MouseConstraint.create(engine, {
			constraint: {
				stiffness: 0.01,
				render: {
					lineWidth: 2,
					strokeStyle: '#fff',
				},
			},
		});

		Composite.add(engine.world, [
			mouseConstraint,
			borderLeft,
			borderRight,
			borderTop,
			borderBottom,
		]);

		Render.run(render);

		const runner = Runner.create();

		Runner.run(runner, engine);

		window.addEventListener('resize', resizeCanvas, { signal });
		resizeCanvas();

		window.addEventListener('keydown', (e) => {
			const key = e.key.toUpperCase();
			const createBodies = Keys[key as keyof typeof Keys];

			if (createBodies) {
				const colour = seedColour(Date.now().toString()).toHex();
				const bodies = createBodies(currentX, centerY * 0.5, bodySize);
				wordGroupsRef.current.push(bodies);
				lastLettersRef.current += key;

				bodies.forEach((a, i) => {
					a.restitution = 1;
					a.frictionAir = 0;
					a.density = 0.1;
					a.friction = 0.5;
					a.inertia = Infinity;
					a.render = {
						fillStyle: colour,
						visible: true,
					};

					// Add initial velocity and angular velocity
					const direction = Math.random() > 0.5 ? 1 : -1; // Randomly choose left or right
					const velocityX = direction * (1 + Math.random() * 5); // Random horizontal velocity
					const velocityY = -2 - Math.random() * 5; // Upward velocity
					const angularVelocity = direction * (0.05 + Math.random() * 0.1); // Rotation speed

					bodies.forEach((b, j) => {
						if (i === j) return;
						Body.setVelocity(b, { x: velocityX, y: velocityY });
						Body.setAngularVelocity(b, angularVelocity);
						Composite.add(engine.world, [
							Constraint.create({
								bodyA: a,
								bodyB: b,
								stiffness: 0.5,
								render: {
									visible: false,
								},
							}),
						]);
					});
				});

				currentX +=
					bodies[bodies.length - 1].position.x - currentX + bodySize * 2;
				if (currentX > centerX * 1.8) {
					currentX = centerX * 0.2;
				}

				Composite.add(engine.world, bodies);
			}

			if (e.key === 'Backspace') {
				const bodies = e.shiftKey
					? wordGroupsRef.current.flat()
					: wordGroupsRef.current.pop();
				if (bodies) {
					Composite.remove(engine.world, bodies);
				}
				if (e.shiftKey) render.options.background = 'transparent';
			}

			const lastSpecialWorld = SPECIAL_WORDS.find((w) =>
				lastLettersRef.current.endsWith(w.world.toUpperCase()),
			);

			if (lastSpecialWorld) {
				lastLettersRef.current = lastLettersRef.current.slice(
					0,
					lastLettersRef.current.length - lastSpecialWorld.world.length,
				);
				wordGroupsRef.current
					.slice(0, -lastSpecialWorld.world.length)
					.flat()
					.forEach((body) => {
						Composite.remove(engine.world, [body]);
					});
				wordGroupsRef.current.flat().forEach((body) => {
					body.render.fillStyle = lastSpecialWorld.foreground;
				});
				render.options.background = lastSpecialWorld.background;
			}
		});

		return () => {
			abortController.abort();
		};
	}, []);

	return (
		<div className="w-full h-full flex flex-col items-center justify-center">
			<p className={classNames('text-sm tracking-widest', styles.floatAround)}>
				just type...
			</p>

			<canvas
				ref={canvasRef}
				className="absolute top-0 left-0 w-full h-full"
			/>
		</div>
	);
};
