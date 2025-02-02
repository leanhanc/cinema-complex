import { revalidateTag } from 'next/cache';

/* Types */
import type { GlobalAfterChangeHook, GlobalConfig } from 'payload';

/* Utils */
import { link } from '../../fields/link';

interface NavbarType {
	navItems: {
		link: {
			type: 'reference' | 'custom';
			label: string;
			reference?: { value: string; relationTo: string };
			url?: string;
		};
	}[];
	ctaButton: {
		show: boolean;
		label: string;
		link: {
			type: 'reference' | 'custom';
			reference?: { value: string; relationTo: string };
			url?: string;
		};
	};
	mobileMenu: {
		menuPosition: 'left' | 'right';
		showSocialLinks: boolean;
	};
}

export const revalidateNavbar: GlobalAfterChangeHook = ({
	doc,
	req: { payload },
}) => {
	payload.logger.info(`Revalidating navbar`);
	revalidateTag('header');
	return doc as NavbarType;
};

export const Navbar: GlobalConfig = {
	slug: 'navbar',
	access: {
		read: () => true,
	},
	admin: {
		description: 'Configure the main navigation bar of your cinema website.',
		group: 'Layout',
	},
	fields: [
		{
			name: 'navItems',
			type: 'array',
			label: 'Navigation Items',
			admin: {
				description: 'Add, remove, and reorder navigation items.',
			},
			fields: [
				link({
					appearances: false,
				}),
			],
			maxRows: 8,
		},
		{
			name: 'ctaButton',
			type: 'group',
			label: 'Call to Action Button',
			admin: {
				description:
					'Configure the main call-to-action button in the navigation.',
			},
			fields: [
				{
					name: 'show',
					type: 'checkbox',
					label: 'Show CTA Button',
					defaultValue: true,
				},
				{
					name: 'label',
					type: 'text',
					label: 'Button Label',
					required: true,
					defaultValue: 'Book Now',
				},
				link({
					appearances: false,
					disableLabel: true,
				}),
			],
		},
		{
			name: 'mobileMenu',
			type: 'group',
			label: 'Mobile Menu Settings',
			admin: {
				description: 'Configure how the navigation appears on mobile devices.',
			},
			fields: [
				{
					name: 'menuPosition',
					type: 'select',
					label: 'Menu Position',
					defaultValue: 'right',
					options: [
						{ label: 'Left Side', value: 'left' },
						{ label: 'Right Side', value: 'right' },
					],
				},
				{
					name: 'showSocialLinks',
					type: 'checkbox',
					label: 'Show Social Links',
					defaultValue: true,
				},
			],
		},
	],
	hooks: {
		afterChange: [revalidateNavbar],
	},
};
