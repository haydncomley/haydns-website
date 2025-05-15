import classNames from 'classnames';

type DecksProps = {
	isDragging: boolean;
};

export const Decks = ({ isDragging }: DecksProps) => (
	<div
		className={classNames(
			'fixed right-0 bottom-0 left-0 z-20 overflow-hidden rounded-t-2xl border border-b-0 border-white/25 bg-black/50 p-4 text-white backdrop-blur-sm transition-all',
			{
				'translate-y-full': !isDragging,
			},
		)}
	>
		<div>In Development</div>
	</div>
);
