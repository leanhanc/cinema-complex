import type {
	CollectionAfterChangeHook,
	CollectionAfterDeleteHook,
	CollectionConfig,
} from 'payload';
import { revalidateTag } from 'next/cache';
import { revalidatePath } from 'next/cache';

/* Types */
import type { Page } from '@/payload-types';

/* Fields */
import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from '@payloadcms/plugin-seo/fields';

import slugField from '../fields/slug';
import heroField from '../fields/hero';

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
	doc,
	req: { payload, context },
}) => {
	if (!context.disableRevalidate) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const path = doc.slug === 'home' ? '/' : `/${doc.slug!}`;

		payload.logger.info(`Revalidating page at path: ${path}`);

		revalidatePath(path);
		console.log('revalidating header');
		revalidateTag('header');
		// revalidateTag('page-metadata');
	}
	return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({
	doc,
	req: { context },
}) => {
	if (!context.disableRevalidate) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const path = doc.slug === 'home' ? '/' : `/${doc.slug!}`;
		revalidatePath(path);
		revalidateTag('header');
		// revalidateTag('page-metadata');
	}

	return doc;
};

export const Pages: CollectionConfig = {
	slug: 'pages',
	access: {
		read: () => true,
	},
	admin: {
		useAsTitle: 'title',
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
		},
		...slugField(),
		{
			type: 'tabs',
			tabs: [
				{
					name: 'content',
					label: 'Content',
					description: 'The content of the page.',
					fields: [...heroField()],
				},
				{
					name: 'settings',
					label: 'Settings',
					description:
						'Customize which global components are shown on this page.',
					fields: [
						{
							name: 'shouldShowNavigation',
							type: 'checkbox',
							label: 'Show Header',
							defaultValue: true,
							admin: {
								description:
									'If checked, the header will be shown on this page.',
							},
						},
						{
							name: 'shouldShowFooter',
							type: 'checkbox',
							label: 'Show Footer',
							defaultValue: true,
							admin: {
								description:
									'If checked, the footer will be shown on this page.',
							},
						},
					],
				},

				{
					name: 'meta',
					label: 'SEO',
					fields: [
						OverviewField({
							titlePath: 'title',
							descriptionPath: 'meta.description',
							imagePath: 'meta.image',
						}),
						MetaImageField({
							relationTo: 'media',
						}),
						MetaDescriptionField({}),
						PreviewField({
							hasGenerateFn: true,
							titlePath: 'title',
							descriptionPath: 'meta.description',
						}),
					],
				},
			],
		},
	],
	hooks: {
		afterChange: [revalidatePage],
		afterDelete: [revalidateDelete],
	},
};
