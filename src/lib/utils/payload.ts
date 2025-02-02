import { getPayload } from 'payload';
import config from '@payload-config';
import type { Media } from '@/payload-types';

export const validateRequiredGlobals = async () => {
	const payload = await getPayload({ config });
	const globals = await payload.findGlobal({ slug: 'customization' });

	const requiredFields = [
		{
			name: 'complexName',
			label: 'Complex Name',
		},
		{
			name: 'logotype',
			label: 'Logotype',
		},
		{
			name: 'favicon',
			label: 'Favicon',
		},
	] as const;

	type RequiredField = (typeof requiredFields)[number];

	const missingFields = requiredFields.filter(
		(field: RequiredField) => !globals[field.name as keyof typeof globals],
	);

	if (missingFields.length > 0) {
		throw new Error(
			`Missing required global configurations: ${missingFields
				.map((field) => field.label)
				.join(', ')}`,
		);
	}

	return globals;
};

export const getServerSideURL = () => {
	let url = process.env.NEXT_PUBLIC_SERVER_URL;

	if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
		return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
	}

	if (!url) {
		url = 'http://localhost:3000/';
	}

	return url;
};

export const getClientSideURL = () => {
	if (typeof window !== 'undefined') {
		const protocol = window.location.protocol;
		const domain = window.location.hostname;
		const port = window.location.port;

		return `${protocol}//${domain}${port ? `:${port}` : ''}`;
	}

	if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
		return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
	}

	return process.env.NEXT_PUBLIC_SERVER_URL ?? '';
};

export const getPayloadLocalApi = async () => {
	return await getPayload({ config });
};

export function isMedia(value: unknown): value is Media {
	return typeof value === 'object' && value !== null && 'url' in value;
}
