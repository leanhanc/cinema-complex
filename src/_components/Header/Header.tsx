import { unstable_cacheTag as cacheTag } from 'next/cache';

/* Components */
import HeaderClientComponent from './Header.client';

/* Types */
import { getPayloadLocalApi } from '@/lib/utils/payload';

async function getHeaderData() {
	'use cache';
	cacheTag('header');

	const payload = await getPayloadLocalApi();

	const headerDataPromise = payload.findGlobal({
		slug: 'header',
		draft: false,
	});

	const globalDataPromise = payload.findGlobal({
		slug: 'customization',
		draft: false,
	});

	const [headerData, globalData] = await Promise.all([
		headerDataPromise,
		globalDataPromise,
	]);

	return { headerData, globalData };
}

export default async function Header() {
	const { headerData, globalData } = await getHeaderData();

	return (
		<header className="bg-blue-800">
			<div className="container flex h-20 flex-row items-center justify-between py-4">
				<HeaderClientComponent
					headerData={headerData}
					globalData={globalData}
				/>
			</div>
		</header>
	);
}
