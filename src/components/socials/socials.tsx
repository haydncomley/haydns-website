import classNames from 'classnames';

import { ActuallySoftwareLogo } from './lib/actually-software';
import { GithubLogo } from './lib/github';
import { LinkedInLogo } from './lib/linkedin';
import { WebsiteLogo } from './lib/website';
import { YoutubeLogo } from './lib/youtube';
import styles from './socials.module.css';

const ARCH_DEPTH = 16; // pixels - how far the middle icons dip down

const SOCIALS = [
	{
		label: 'YouTube',
		href: 'https://www.youtube.com/@haydncomley',
		Logo: YoutubeLogo,
		brandColor: '#FF0000',
	},
	{
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/haydncomley',
		Logo: LinkedInLogo,
		brandColor: '#0A66C2',
	},
	{
		label: 'GitHub',
		href: 'https://github.com/haydncomley',
		Logo: GithubLogo,
		brandColor: '#6c31b3',
	},
	// {
	// 	label: 'Website',
	// 	href: 'https://haydncomley.com',
	// 	Logo: WebsiteLogo,
	// 	brandColor: '#fbee19',
	// },
	{
		label: 'Actually Software',
		href: 'https://actually.software',
		Logo: ActuallySoftwareLogo,
		brandColor: '#dd8ab7',
	},
];

export const Socials = () => {
	const center = (SOCIALS.length - 1) / 2;

	return (
		<div className="flex items-center justify-center gap-8">
			{SOCIALS.map((social, index) => {
				const distance = Math.abs(index - center);
				const offset = ARCH_DEPTH * (1 - distance / center);

				return (
					<a
						title={social.label}
						className={classNames(
							'flex h-8 w-8 origin-center items-center justify-center transition-all hover:scale-125 hover:-rotate-6 hover:text-(--brand-color) nth-[even]:hover:rotate-6',
							styles.social,
						)}
						style={
							{
								'--brand-color': social.brandColor,
								transform: `translateY(${offset}px)`,
							} as React.CSSProperties
						}
						href={social.href}
						key={social.label}
						target="_blank"
					>
						<social.Logo />
					</a>
				);
			})}
		</div>
	);
};
