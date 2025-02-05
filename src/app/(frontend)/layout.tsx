import { Suspense, type ReactNode } from 'react';
import { notFound } from 'next/navigation';

/* Styles */
import '@/lib/styles/theme.css';

/* Components */
import LoadingScreen from '@/_components/LoadingScreen';
import HeaderNav from '@/_components/Header/HeaderNav.server';
import DrawerNav from '@/_components/Drawer/DrawerNav.server';

/* Providers */
import GlobalsValidator from '@/lib/providers/GlobalsValidator';

/* Context */
import HeaderContextProvider from '@/lib/context/HeaderContext';

/* Utils */
import { getPayloadLocalApi } from '@/app/(payload)/utils/getPayloadLocalApi';

async function PageContent({ slug }: { slug: string }) {
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
		return notFound();
	}

	const { settings } = pageSettings.docs[0];

	return settings;
}

function LayoutContent({
	children,
	slug,
}: {
	children: ReactNode;
	slug: string;
}) {
	return (
		<GlobalsValidator>
			<HeaderContextProvider>
				<Suspense fallback={<div className="h-20 bg-blue-800" />}>
					<AsyncLayoutContent slug={slug}>{children}</AsyncLayoutContent>
				</Suspense>
			</HeaderContextProvider>
		</GlobalsValidator>
	);
}

async function AsyncLayoutContent({
	children,
	slug,
}: {
	children: ReactNode;
	slug: string;
}) {
	const settings = await PageContent({ slug });

	return (
		<>
			{settings?.shouldShowNavigation && (
				<>
					<HeaderNav />
					<DrawerNav />
				</>
			)}
			{children}
			{settings?.shouldShowFooter && <footer>Footer</footer>}
		</>
	);
}

export default async function RootLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ slug: string }>;
}) {
	const slug = await params.then((p) => p.slug || 'home');

	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body className="bg-blue-600 text-neutral-500">
				<Suspense fallback={<LoadingScreen />}>
					<LayoutContent slug={slug}>{children}</LayoutContent>
				</Suspense>
			</body>
		</html>
	);
}
