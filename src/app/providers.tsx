'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

import type { ThemePreference } from '~/lib/theme';

const ServerThemePreferenceContext = createContext<ThemePreference | null>(
	null,
);

export const useServerThemePreference = () =>
	useContext(ServerThemePreferenceContext);

type ProvidersProps = {
	children: ReactNode;
	themePreference: ThemePreference | null;
};

export default function Providers({
	children,
	themePreference,
}: ProvidersProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000,
					},
				},
			}),
	);

	return (
		<ServerThemePreferenceContext.Provider value={themePreference}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</ServerThemePreferenceContext.Provider>
	);
}
