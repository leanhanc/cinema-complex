import { Suspense, type ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { unstable_cacheTag as cacheTag } from 'next/cache';

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

async function getHeaderData() {
	'use cache';
	cacheTag('header');

	const payload = await getPayloadLocalApi();

	const headerData = await payload.findGlobal({
		slug: 'header',
		draft: false,
	});

	return headerData;
}

async function getPageSettings(slug: string) {
	const payload = await getPayloadLocalApi();

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

	if (!pageSettings.docs.length) {
		return null;
	}

	return pageSettings.docs[0];
}

async function getCustomizationData() {
	const payload = await getPayloadLocalApi();

	return payload.findGlobal({
		slug: 'customization',
		draft: false,
	});
}

async function LayoutContent({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ slug: string }>;
}) {
	const slug = (await params).slug || 'home';

	const [headerData, pageSettings, customizationData] = await Promise.all([
		getHeaderData(),
		getPageSettings(slug),
		getCustomizationData(),
	]);

	if (!pageSettings) {
		return notFound();
	}

	const { settings } = pageSettings;

	return (
		<GlobalsValidator>
			<HeaderContextProvider>
				<Suspense fallback={<div>Loading...</div>}>
					{settings?.shouldShowNavigation && (
						<>
							<Header
								headerData={headerData}
								customizationData={customizationData}
							/>
							<Drawer headerData={headerData} />
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
