import Link from 'next/link';

import { Socials } from '~/components/socials';

const modules = [
	{
		name: 'Gaming Dashboard',
		path: 'https://redditplayrust.com/stats',
	},
	{
		name: 'AI Chatbot',
		path: 'https://tfree.chat/',
	},
	{
		name: 'Vinyl Viewer',
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
		<main className="flex h-full w-full flex-col gap-1 overflow-hidden">
			<div className="flex flex-col items-start gap-3 p-4">
				<div className="flex flex-col gap-1">
					<h1 className="text-2xl font-bold md:text-4xl">haydns.website</h1>
					<p className="text-sm md:text-lg">
						just a collection of stuff and things
					</p>
				</div>
				<Socials />
			</div>

			<div className="-m-4 flex-1 overflow-auto p-4">
				<div className="md grid grid-cols-1 gap-4 p-4 pt-0 sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-6">
					{modules.map((module) => (
						<article
							key={module.path}
							className="relative aspect-video w-full overflow-hidden rounded-xl shadow-md transition-all hover:scale-105 hover:shadow-xl"
							aria-label={`${module.name} Project`}
							title={module.name}
						>
							<Link
								href={module.path}
								target={module.path.startsWith('/') ? '_self' : '_blank'}
								className="relative flex h-full w-full items-center justify-center font-black uppercase"
							>
								<video
									src={`/modules/${module.name.replaceAll(' ', '-').toLowerCase()}.mp4`}
									className="h-full w-full object-cover"
									autoPlay
									muted
									loop
									playsInline
								/>
								<span className="absolute bottom-0 left-0 overflow-hidden rounded-tr-md px-2.5 py-0.5 mix-blend-exclusion shadow-sm backdrop-blur-xl">
									<span className="text-white">{module.name}</span>
								</span>
							</Link>
						</article>
					))}
				</div>
			</div>
		</main>
	);
}
