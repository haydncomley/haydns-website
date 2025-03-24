import { PhysicsTypeModule } from './physics-type/page';

const modules = [PhysicsTypeModule];

export default function Page() {
	return (
		<main className="h-full w-full overflow-hidden">
			<div className="flex flex-col items-center justify-center h-full w-full gap-16">
				<div className="flex flex-col items-center justify-center gap-2">
					<h1 className="text-4xl font-bold">haydns.website</h1>
					<p>My website for some stuff and some things.</p>
				</div>

				<div>
					{modules.map((module) => (
						<article
							key={module.path}
							className="aspect-video w-[75vw] md:w-[35vw] rounded-2xl overflow-hidden shadow-md transition-all hover:scale-105 hover:shadow-2xl"
							aria-label={`${module.name} Project`}
						>
							<a
								href={module.path}
								className="w-full h-full flex items-center justify-center font-black uppercase text-xl relative"
							>
								<video
									src={`/modules/${module.name}.mp4`}
									className="w-full h-full object-cover"
									autoPlay
									muted
									loop
								/>

								<span className="absolute bottom-0 left-0 p-2 mix-blend-exclusion">
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
