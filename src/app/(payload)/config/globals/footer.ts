/* Types */
import type { GlobalConfig } from 'payload';
import type { Field } from 'payload';

/* Fields */
import { link } from '../../fields/link';

const footerColumns: Field = {
	name: 'columns',
	type: 'array',
	maxRows: 4,
	labels: {
		singular: 'Column',
		plural: 'Columns',
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			label: 'Column Title',
		},
		{
			name: 'links',
			type: 'array',
			maxRows: 4,
			labels: {
				singular: 'Link',
				plural: 'Links',
			},
			fields: [link()],
		},
	],
};

const socialLinks: Field = {
	name: 'socialLinks',
	type: 'array',
	label: 'Social Links',
	labels: {
		singular: 'Social Link',
		plural: 'Social Links',
	},
	fields: [
		{
			name: 'icon',
			type: 'upload',
			relationTo: 'media',
			required: true,
			label: 'Social Icon',
		},
		link(),
	],
};

export const Footer: GlobalConfig = {
	slug: 'footer',
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'description',
			type: 'richText',
			label: 'Description',
			required: true,
		},
		footerColumns,
		socialLinks,
		{
			name: 'copyright',
			type: 'text',
			label: 'Copyright Text',
			required: true,
		},
	],
	graphQL: {
		name: 'Footer',
	},
};
