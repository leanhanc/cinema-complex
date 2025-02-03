import { draftMode } from 'next/headers';
import { unstable_cacheTag as cacheTag } from 'next/cache';

/* Utils */
import { getPayloadLocalApi } from '@/app/(payload)/utils/getPayloadLocalApi';
import { generateMeta } from '@/lib/utils/metadata';

/* Types */
import type { Metadata } from 'next';

export default function Page() {
	return (
		<main className="container">
			<h1>Hello World slug</h1>
		</main>
	);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{
		slug?: string;
	}>;
}): Promise<Metadata> {
	'use cache';
	// cacheTag('page-metadata');

	const { slug = 'home' } = await params;
	const page = await queryPageBySlug({
		slug,
	});

	return generateMeta({ doc: page });
}

async function queryPageBySlug({ slug }: { slug: string }) {
	'use cache';
	// cacheTag(slug);
	const { isEnabled: draft } = await draftMode();

	const payload = await getPayloadLocalApi();

	const result = await payload.find({
		collection: 'pages',
		draft,
		limit: 1,
		pagination: false,
		overrideAccess: draft,
		where: {
			slug: {
				equals: slug,
			},
		},
	});

	return result.docs[0] || null;
}
