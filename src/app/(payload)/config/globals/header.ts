import { revalidateTag } from 'next/cache';

/* Types */
import type { GlobalAfterChangeHook, GlobalConfig } from 'payload';
import { link } from '../../fields/link';

export const revalidateHeader: GlobalAfterChangeHook = ({
	doc,
	req: { payload, context },
}) => {
	if (!context.disableRevalidate) {
		payload.logger.info(`Revalidating header`);

		revalidateTag('header');
	}

	return doc as Global;
};

export const Header: GlobalConfig = {
	slug: 'header',
	access: {
		read: () => true,
	},
	admin: {
		description: 'The navigation bar of the website, present on all pages.',
	},
	fields: [
		{
			name: 'navItems',
			type: 'array',
			fields: [
				link({
					appearances: false,
				}),
			],
			maxRows: 6,
		},
	],
	hooks: {
		afterChange: [revalidateHeader],
	},
};
