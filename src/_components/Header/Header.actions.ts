'use server';

import { unstable_cacheTag as cacheTag } from 'next/cache';
import { getPayloadLocalApi } from '@/app/(payload)/utils/getPayloadLocalApi';

export async function getHeaderData() {
	'use cache';
	cacheTag('header');

	const payload = await getPayloadLocalApi();

	const [headerData, customizationData] = await Promise.all([
		payload.findGlobal({
			slug: 'header',
			draft: false,
		}),
		payload.findGlobal({
			slug: 'customization',
			draft: false,
		}),
	]);

	return { headerData, customizationData };
}
