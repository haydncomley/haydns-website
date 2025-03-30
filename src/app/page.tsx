import { Socials } from '~/components/socials';

import { NumberChainModule } from './number-chain/page';
import { PhysicsTypeModule } from './physics-type/page';

const modules = [NumberChainModule, PhysicsTypeModule];

export default function Page() {
	return (
		<main className="h-full w-full overflow-hidden flex flex-col">
			<div className="flex flex-col p-4 items-start gap-2">
				<div className="flex flex-col">
					<h1 className="text-2xl font-bold">haydns.website</h1>
					<p className="text-sm">just a collection of stuff and things</p>
				</div>
				<Socials />
			</div>

			<div className="grid grid-cols-1 grid-rows-18 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-9 2xl:grid-cols-6 xl:grid-rows-6 flex-1 p-4 pt-0 gap-2">
				{modules.map((module) => (
					<article
						key={module.path}
						className="w-full h-full rounded-xl overflow-hidden shadow-md relative transition-all hover:scale-105 hover:shadow-xl"
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
		</main>
	);
}
