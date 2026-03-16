import classNames from 'classnames';
import type { PropsWithChildren } from 'react';

export type ProjectRowProps = {
	displayIndex?: number;
	isFirst?: boolean;
	isVisible?: boolean;
	align?: 'start' | 'end';
} & PropsWithChildren;

export const ProjectRow = ({
	children,
	displayIndex = 0,
	align = 'start',
	isFirst = false,
	isVisible = true,
}: ProjectRowProps) => (
	<section
		aria-hidden={!isVisible}
		className={classNames(
			'flex w-full max-w-6xl justify-center overflow-visible px-12 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:px-16',
			{
				'translate-y-0 opacity-100': isVisible,
				'pointer-events-none -translate-y-10 opacity-0': !isVisible,
			},
		)}
		style={{
			transitionDelay: isVisible ? `${displayIndex * 45}ms` : '0ms',
		}}
	>
		<div
			className={classNames(
				'grid w-full transition-[grid-template-rows,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
				{
					'grid-rows-[1fr]': isVisible,
					'grid-rows-[0fr]': !isVisible,
				},
			)}
		>
			<div
				className={classNames('min-h-0', {
					'overflow-visible': isVisible,
					'overflow-hidden': !isVisible,
				})}
			>
				<div
					className={classNames(
						'flex w-full justify-center transition-[margin,transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:h-80',
						{
							'mt-8 lg:-mt-16': isVisible && !isFirst,
							'-mt-8 lg:mt-auto': isVisible && isFirst,
							'mt-0 lg:mt-0': !isVisible,
							'lg:justify-end': align === 'end',
							'lg:justify-start': align === 'start',
						},
					)}
				>
					{children}
				</div>
			</div>
		</div>
	</section>
);
