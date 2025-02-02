import type {
	CollectionAfterChangeHook,
	CollectionAfterDeleteHook,
} from 'payload';
import { revalidatePath, revalidateTag } from 'next/cache';

/* Types */
import type { Page } from '@/payload-types';

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
	doc,
	req: { payload, context },
}) => {
	if (!context.disableRevalidate) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const path = doc.slug === 'home' ? '/' : `/${doc.slug!}`;

		payload.logger.info(`Revalidating page at path: ${path}`);

		revalidatePath(path);
		revalidateTag('pages-sitemap');
	}
	return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({
	doc,
	req: { context },
}) => {
	if (!context.disableRevalidate) {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		const path = doc.slug === 'home' ? '/' : `/${doc.slug}`;
		revalidatePath(path);
		revalidateTag('pages-sitemap');
	}

	return doc;
};
