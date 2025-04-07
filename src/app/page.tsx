import { Socials } from '~/components/socials';

const modules = [
	{
		name: 'Vinyl Player',
		path: '/vinyl-player',
	},
	{
		name: 'Number Chain',
		path: '/number-chain',
	},
	{
		name: 'Physics Type',
		path: '/physics-type',
	},
];
export default function Page() {
	return (
		<main className="h-full w-full overflow-hidden flex flex-col gap-1">
			<div className="flex flex-col p-4 items-start gap-3">
				<div className="flex flex-col gap-1">
					<h1 className="text-2xl font-bold md:text-4xl">haydns.website</h1>
					<p className="text-sm md:text-lg">
						just a collection of stuff and things
					</p>
				</div>
				<Socials />
			</div>

			<div className="flex-1 overflow-auto p-4 -m-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md 2xl:grid-cols-6 p-4 pt-0 gap-4">
					{modules.map((module) => (
						<article
							key={module.path}
							className="w-full aspect-video rounded-xl overflow-hidden shadow-md relative transition-all hover:scale-105 hover:shadow-xl"
							aria-label={`${module.name} Project`}
							title={module.name}
						>
							<a
								href={module.path}
								className="w-full h-full flex items-center justify-center font-black uppercase relative"
							>
								<video
									src={`/modules/${module.path.replaceAll('/', '')}.mp4`}
									className="w-full h-full object-cover"
									autoPlay
									muted
									loop
								/>

								<span className="absolute bottom-0 left-0 p-2 pb-1 mix-blend-exclusion text-white">
									{module.name}
								</span>
							</a>
						</article>
					))}
				</div>
			</div>
		</main>
	);
}
