export const Menu = () => (
	<div className="w-full h-full flex flex-col items-center justify-center gap-4">
		<h1 className="text-4xl font-bold uppercase">Number Chain</h1>
		<div className="flex flex-col bg-primary/15 shadow-md p-3 gap-1 rounded-xl">
			<p className="text-sm font-bold">How to play</p>
			<p className="text-sm">
				Chain blocks together to add their numbers up. <br />
				Reach the target to lock them in place. <br />
				Lock all blocks in place to beat the level.
			</p>
		</div>

		<div className="flex flex-col gap-2">
			<a href="?level=1">Play</a>
		</div>
	</div>
);
