import type { CollectionConfig } from 'payload';

export const Theaters: CollectionConfig = {
	slug: 'theaters',
	labels: {
		singular: 'Theater',
		plural: 'Theaters',
	},
	admin: {
		useAsTitle: 'name',
		description:
			'Theaters are the physical locations where movies are shown. They have at least one screen.',
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
		},
		{
			name: 'address',
			type: 'text',
			required: true,
		},
		{
			name: 'phone',
			type: 'text',
			required: true,
		},
	],
};
