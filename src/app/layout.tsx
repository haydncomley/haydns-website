import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';
import type { ReactNode } from 'react';

import Providers from './providers';

const rubik = Rubik({
	variable: '--font-rubik',
	subsets: ['latin'],
	weight: ['400', '700'],
});

export const metadata: Metadata = {
	title: 'haydns.website',
	description: 'My website for some stuff and some things.',
};

type RootLayoutProps = {
	children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<head>
				<link
					rel="icon"
					type="image/png"
					href="/favicon-96x96.png"
					sizes="96x96"
				/>
				<link
					rel="icon"
					type="image/svg+xml"
					href="/favicon.svg"
				/>
				<link
					rel="shortcut icon"
					href="/favicon.ico"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<meta
					name="apple-mobile-web-app-title"
					content="Haydn"
				/>
				<link
					rel="manifest"
					href="/site.webmanifest"
				/>
			</head>
			<body className={`${rubik.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
