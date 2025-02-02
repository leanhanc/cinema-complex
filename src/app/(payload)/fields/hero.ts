import type { Field } from 'payload';

const heroField = (): Field[] => {
	return [
		{
			name: 'hero',
			type: 'group',
			fields: [
				{
					name: 'title',
					type: 'richText',
					required: true,
					label: 'Hero Title',
				},
				{
					name: 'backgroundImage',
					type: 'upload',
					relationTo: 'media',
					label: 'Background Image',
				},
				{
					name: 'showAppIcon',
					type: 'checkbox',
					label: 'Show App Icon',
					defaultValue: false,
				},
			],
		},
	];
};

export default heroField;
