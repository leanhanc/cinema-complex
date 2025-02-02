import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
	slug: 'media',
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'alt',
			type: 'text',
			admin: {
				description:
					'The alternative text for the media. It is used to describe the media to screen readers and search engines.',
			},
			required: true,
		},
	],
	upload: true,
};
