import { Suspense } from 'react';
import { unstable_cacheTag as cacheTag } from 'next/cache';

/* Types */
import type { Customization } from '@/payload-types';

/* Components */
import HeaderClientComponent from './Header.client';

/* Types */
import { getPayloadLocalApi } from '@/app/(payload)/utils/getPayloadLocalApi';

async function getHeaderData() {
	'use cache';
	cacheTag('header');

	const payload = await getPayloadLocalApi();

	const headerData = await payload.findGlobal({
		slug: 'header',
		draft: false,
	});

	return { headerData };
}

export default async function Header({
	customizationData,
}: {
	customizationData: Customization;
}) {
	const { headerData } = await getHeaderData();

	return (
		<header className="bg-blue-800">
			<div className="container flex h-20 flex-row items-center justify-between py-4">
				<Suspense fallback={<div>Loading...</div>}>
					<HeaderClientComponent
						headerData={headerData}
						customizationData={customizationData}
					/>
				</Suspense>
			</div>
		</header>
	);
}
