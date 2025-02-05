'use server';

import { unstable_cacheTag as cacheTag } from 'next/cache';

/* Utils */
import { getPayloadLocalApi } from '@/app/(payload)/utils/getPayloadLocalApi';

export async function getHeaderData() {
	'use cache';
	cacheTag('header');

	const payload = await getPayloadLocalApi();

	const headerData = await payload.findGlobal({
		slug: 'header',
		draft: false,
	});

	return headerData;
}
