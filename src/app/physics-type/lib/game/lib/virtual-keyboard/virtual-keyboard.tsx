import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { KEYBOARD_ROWS } from './lib/consts';

export const VirtualKeyboard = () => {
	const keyboardRef = useRef<HTMLDivElement>(null);
	const [heldKeys, setHeldKeys] = useState<string[]>([]);

	const sendClickEvent = (key: string, shiftKey: boolean) => {
		const event = new KeyboardEvent('virtual-keydown', {
			view: window,
			bubbles: true,
			cancelable: true,
			key,
			shiftKey,
		});
		window.dispatchEvent(event);
		setHeldKeys((prev) => [...prev, key]);
		setTimeout(() => {
			setHeldKeys((prev) => prev.filter((key) => key !== key));
		}, 100);
	};

	useEffect(() => {
		const abortController = new AbortController();
		const { signal } = abortController;

		const handleKeyDown = (e: KeyboardEvent) => {
			sendClickEvent(e.key, e.shiftKey);
		};

		window.addEventListener('keydown', handleKeyDown, { signal });

		return () => abortController.abort();
	}, []);

	useEffect(() => {
		if (!keyboardRef.current) return;

		const width = keyboardRef.current.clientWidth;
		const percent = document.body.clientWidth / width;

		if (percent < 1) keyboardRef.current.style.transform = `scale(${percent})`;
		keyboardRef.current.style.opacity = '1';
	}, []);

	return (
		<div
			ref={keyboardRef}
			className="flex flex-col gap-2 p-4 opacity-0 transition-all"
		>
			{KEYBOARD_ROWS.map((row, index) => (
				<div
					key={index}
					className="flex items-center justify-center gap-2"
				>
					{row.map((key) => (
						<button
							key={key}
							onMouseDown={() => sendClickEvent(key.toLowerCase(), false)}
							onTouchStart={() => sendClickEvent(key.toLowerCase(), false)}
							className={classNames(
								'bg-background border-foreground/15 hover:bg-foreground/5 h-10 w-10 rounded-xl border transition-all duration-100',
								{
									'!bg-secondary': heldKeys.includes(key.toLowerCase()),
								},
							)}
						>
							{key}
						</button>
					))}
				</div>
			))}
		</div>
	);
};
