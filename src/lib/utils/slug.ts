import type { FieldHook } from 'payload';

export const format = (val: string): string =>
	val
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '')
		.toLowerCase();

type SlugData = Record<string, unknown>;

const formatSlug =
	(fallback: string): FieldHook =>
	({ data, operation, originalDoc, value }): string | null => {
		if (typeof value === 'string') {
			return format(value);
		}

		if (operation === 'create') {
			const fallbackData =
				(data as SlugData)[fallback] || (originalDoc as SlugData)[fallback];

			if (fallbackData && typeof fallbackData === 'string') {
				return format(fallbackData);
			}
		}

		return value as string | null;
	};

export default formatSlug;
