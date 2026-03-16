import classNames from 'classnames';

import { GithubLogo } from './lib/github';
import { LinkedInLogo } from './lib/linkedin';
import { YoutubeLogo } from './lib/youtube';
import styles from './socials.module.css';

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
		brandColor: '#3c1e60',
	},
];

export const Socials = () => (
	<div className="flex items-center justify-center gap-8">
		{SOCIALS.map((social) => (
			<a
				title={social.label}
				className={classNames(
					'flex h-8 w-8 items-center justify-center transition-all hover:scale-125 hover:-rotate-6 hover:text-(--brand-color) nth-[even]:hover:rotate-6',
					styles.social,
				)}
				style={
					{
						'--brand-color': social.brandColor,
					} as React.CSSProperties
				}
				href={social.href}
				key={social.label}
				target="_blank"
			>
				<social.Logo />
			</a>
		))}
	</div>
);
