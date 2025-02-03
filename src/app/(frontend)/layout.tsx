import { notFound } from 'next/navigation';
import { Suspense, type ReactNode } from 'react';

/* Styles */
import '@/lib/styles/theme.css';

/* Components */
import LoadingScreen from '@/_components/LoadingScreen';
import Header from '@/_components/Header/Header.server';
import Drawer from '@/_components/Drawer/Drawer';

/* Providers */
import GlobalsValidator from '@/lib/providers/GlobalsValidator';

/* Utils */
import { getPayloadLocalApi } from '@/app/(payload)/utils/getPayloadLocalApi';

/* Context */
import HeaderContextProvider from '@/lib/context/HeaderContext';

async function LayoutContent({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ slug: string }>;
}) {
	const payload = await getPayloadLocalApi();
	const slug = (await params).slug || 'home';

	const pageSettings = await payload.find({
		collection: 'pages',
		select: {
			settings: true,
		},
		limit: 1,
		pagination: false,
		where: {
			slug: {
				equals: slug,
			},
		},
	});

	const customizationData = await payload.findGlobal({
		slug: 'customization',
		draft: false,
	});

	if (!pageSettings.docs.length) {
		return notFound();
	}

	const { settings } = pageSettings.docs[0];

	return (
		<GlobalsValidator>
			<HeaderContextProvider>
				<Suspense fallback={<div>Loading...</div>}>
					{settings?.shouldShowNavigation && (
						<>
							<Header customizationData={customizationData} />
							<Drawer customizationData={customizationData} />
						</>
					)}
					{children}
					{settings?.shouldShowFooter && <footer>Footer</footer>}
				</Suspense>
			</HeaderContextProvider>
		</GlobalsValidator>
	);
}

export default function RootLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ slug: string }>;
}) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body className="bg-blue-600 text-neutral-500">
				<Suspense fallback={<LoadingScreen />}>
					<LayoutContent params={params}>{children}</LayoutContent>
				</Suspense>
			</body>
		</html>
	);
}
