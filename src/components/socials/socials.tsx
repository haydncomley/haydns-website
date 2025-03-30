import classNames from 'classnames';

import { GithubLogo } from './lib/github';
import { LinkedInLogo } from './lib/linkedin';
import { YoutubeLogo } from './lib/youtube';
import styles from './socials.module.css';

const SOCIALS = [
	{
		label: 'GitHub',
		href: 'https://github.com/haydncomley',
		Logo: GithubLogo,
	},
	{
		label: 'YouTube',
		href: 'https://www.youtube.com/@haydncomley',
		Logo: YoutubeLogo,
	},
	{
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/haydncomley',
		Logo: LinkedInLogo,
	},
];

export const Socials = () => (
	<div className="flex items-center justify-center gap-3">
		{SOCIALS.map((social) => (
			<a
				title={social.label}
				className={classNames(
					'flex items-center justify-center w-5 h-5 hover:scale-125 hover:opacity-80 hover:-rotate-6 nth-[even]:hover:rotate-6 transition-all',
					styles.social,
				)}
				href={social.href}
				key={social.label}
				target="_blank"
			>
				<social.Logo />
			</a>
		))}
	</div>
);
