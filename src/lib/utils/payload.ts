/* Types */
import type { Media } from '@/payload-types';

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

export function isMedia(value: unknown): value is Media {
	return typeof value === 'object' && value !== null && 'url' in value;
}
