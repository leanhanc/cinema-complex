import { revalidateTag } from 'next/cache';
import type { GlobalConfig, GlobalAfterChangeHook } from 'payload';

interface CustomizationType {
	complexName?: string;
	description?: string;
	logotype?: {
		id: string;
		url: string;
	};
	favicon?: {
		id: string;
		url: string;
	};
	logo?: {
		id: string;
		url: string;
	};
}

export const revalidateCustomization: GlobalAfterChangeHook = ({
	doc,
	req: { payload },
}) => {
	payload.logger.info(`Revalidating customization`);
	revalidateTag('header');
	return doc as CustomizationType;
};

export const Customization: GlobalConfig = {
	slug: 'customization',
	label: 'Brand Customization',
	fields: [
		{
			name: 'complexName',
			label: 'Complex Name',
			admin: {
				description: 'Enter the official name of your cinema establishment.',
			},
			type: 'text',
		},
		{
			name: 'description',
			label: 'Description',
			type: 'textarea',
			admin: {
				description:
					'Enter a short description of your cinema establishment. It would be used for SEO purposes.',
			},
		},
		{
			name: 'logotype',
			label: 'Logotype',
			type: 'upload',
			relationTo: 'media',
			admin: {
				description:
					'Upload your main brand identity image that includes both the visual element and the name of your cinema. This will be used as your primary branding element.',
			},
		},
		{
			name: 'favicon',
			label: 'Favicon',
			type: 'upload',
			relationTo: 'media',
			admin: {
				description:
					'Upload a small icon image that represents your cinema. This small image will appear in web browser tabs and bookmarks when customers visit your website.',
			},
		},
		{
			name: 'logo',
			label: 'Logo',
			type: 'upload',
			relationTo: 'media',
			admin: {
				description:
					'Upload a simplified version of your brand image, typically just the symbol without any text. This compact version of your brand will be used in spaces where the full logotype would be too large.',
			},
		},
	],
	hooks: {
		afterChange: [revalidateCustomization],
	},
};
