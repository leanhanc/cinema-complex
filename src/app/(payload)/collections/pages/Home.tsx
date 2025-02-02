/* Types */
import type { GlobalConfig } from 'payload';

/* Fields */
import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from '@payloadcms/plugin-seo/fields';

export const HomePage: GlobalConfig = {
	slug: 'home',
	label: 'Home',
	admin: {
		group: 'Pages',
		description: 'The website home page.',
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			label: 'Home Page Title',
		},
		{
			type: 'tabs',
			tabs: [
				{
					name: 'hero',
					label: 'Hero Section',
					fields: [
						{
							name: 'heroText',
							type: 'richText',
							required: true,
							label: 'Hero Text',
							admin: {
								description:
									'This text will be displayed on the Hero Section on top of the Hero Image background.',
							},
						},
						{
							name: 'heroImage',
							type: 'upload',
							relationTo: 'media',
							required: true,
							label: 'Hero Image',
							admin: {
								description: 'Recommended size: 1920x1080px',
							},
						},
						{
							name: 'shouldShowLogo',
							type: 'checkbox',
							required: true,
							label: 'Show Logo',
							admin: {
								description:
									'If checked, the logo will be shown on the Hero Section, under the Hero text.',
							},
						},
					],
				},
				{
					name: 'meta',
					label: 'SEO',
					fields: [
						OverviewField({
							titlePath: 'meta.title',
							descriptionPath: 'meta.description',
							imagePath: 'meta.image',
						}),
						MetaTitleField({
							hasGenerateFn: true,
						}),
						MetaImageField({
							relationTo: 'media',
						}),
						MetaDescriptionField({}),
						PreviewField({
							hasGenerateFn: true,
							titlePath: 'meta.title',
							descriptionPath: 'meta.description',
						}),
					],
				},
			],
		},
	],
};
