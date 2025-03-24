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
			<body className={`${rubik.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
