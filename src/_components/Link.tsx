import NextLink from 'next/link';
import React from 'react';

/* Utils */
import { cn } from '@/lib/utils/tailwind';

/* Types */
import type { Page } from '@/payload-types';

interface CMSLinkType {
	appearance?: 'inline' | 'button';
	children?: React.ReactNode;
	className?: string;
	label?: string | null;
	newTab?: boolean | null;
	reference?: {
		relationTo: 'pages' | 'posts';
		value: Page | string | number;
	} | null;
	type?: 'custom' | 'reference' | null;
	url?: string | null;
}

export default function Link(props: CMSLinkType) {
	const {
		type,
		appearance = 'inline',
		children,
		className,
		label,
		newTab,
		reference,
		url,
	} = props;

	const href =
		type === 'reference' &&
		typeof reference?.value === 'object' &&
		reference.value.slug
			? `${reference.relationTo !== 'pages' ? `/${reference.relationTo}` : ''}/${
					reference.value.slug
				}`
			: url;

	if (!href) return null;

	const newTabProps = newTab
		? { rel: 'noopener noreferrer', target: '_blank' }
		: {};

	/* Ensure we don't break any styles set by richText */
	if (appearance === 'inline') {
		return (
			<NextLink
				className={cn(className)}
				href={(href || url) ?? ''}
				{...newTabProps}
			>
				{label && label}
				{children && children}
			</NextLink>
		);
	}

	return (
		<button className={className} {...newTabProps}>
			<NextLink className={cn(className)} href={(href || url) ?? ''}>
				{label && label}
				{children && children}
			</NextLink>
		</button>
	);
}
