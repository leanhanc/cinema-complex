import { Suspense } from 'react';

/* Components */
import Link from '@/_components/Link';
import Drawer from './Drawer';

/* Server Actions */
import { getHeaderData } from './Drawer.actions';

async function AsyncDrawerContent() {
	const headerData = await getHeaderData();

	if (!headerData.navItems?.length) return null;

	return headerData.navItems.map((navItem) => {
		return (
			<li key={navItem.link.label}>
				<Link {...navItem.link} />
			</li>
		);
	});
}

function DrawerContent() {
	return (
		<Suspense fallback={<DrawerSkeleton />}>
			<AsyncDrawerContent />
		</Suspense>
	);
}

function DrawerSkeleton() {
	return (
		<>
			{[1, 2, 3].map((i) => (
				<li key={i} className="animate-pulse">
					<div className="my-2 h-6 w-32 rounded bg-blue-800" />
				</li>
			))}
		</>
	);
}

export default function DrawerNav() {
	return (
		<Drawer>
			<DrawerContent />
		</Drawer>
	);
}
