import type { Metadata } from 'next';

/* Types */
import type { Page } from '@/payload-types';

/* Utils */
import { getPayloadLocalApi } from '@/app/(payload)/utils/getPayloadLocalApi';
import { getServerSideURL } from '@/app/(payload)/utils/getServerSideUrl';

// TODO: USE GLOBAL
const defaultOpenGraph: Metadata['openGraph'] = {
	type: 'website',
	description: 'An open-source website built with Payload and Next.js.',
	images: [
		{
			url: `${getServerSideURL()}/website-template-OG.webp`,
		},
	],
	siteName: 'Payload Website Template',
	title: 'Payload Website Template',
};

export const mergeOpenGraph = (
	og?: Metadata['openGraph'],
): Metadata['openGraph'] => {
	return {
		...og,
		images: og?.images ? og.images : defaultOpenGraph.images,
	};
};

export const generateMeta = async (args: {
	doc: Partial<Page> | null;
}): Promise<Metadata> => {
	const payload = await getPayloadLocalApi();
	const { doc } = args;
	const globalData = await payload.findGlobal({
		slug: 'customization',
	});

	const title = doc?.meta?.title
		? `${doc.meta.title} | ${globalData.complexName ?? 'Cinema Complex'}`
		: (globalData.complexName ?? 'Cinema Complex');

	return {
		description: doc?.meta?.description ?? '',
		openGraph: mergeOpenGraph({
			description: doc?.meta?.description ?? '',
			title,
			url: Array.isArray(doc?.slug) ? doc.slug.join('/') : '/',
		}),
		title,
	};
};
