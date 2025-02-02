import type { CheckboxField, FieldHook, TextField } from 'payload';

interface Overrides {
	slugOverrides?: Partial<TextField>;
	checkboxOverrides?: Partial<CheckboxField>;
}

export const formatSlug = (val: string): string =>
	val
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '')
		.toLowerCase();

const formatSlugHook =
	(fallback: string): FieldHook =>
	({ data, operation, value }) => {
		if (typeof value === 'string') {
			return formatSlug(value);
		}

		if (operation === 'create' || !data?.slug) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const fallbackData = data?.[fallback] || data?.[fallback];

			if (fallbackData && typeof fallbackData === 'string') {
				return formatSlug(fallbackData);
			}
		}

		return value as string;
	};

type Slug = (
	fieldToUse?: string,
	overrides?: Overrides,
) => [TextField, CheckboxField];

const slugField: Slug = (fieldToUse = 'title', overrides = {}) => {
	const { slugOverrides, checkboxOverrides } = overrides;

	const checkBoxField: CheckboxField = {
		name: 'slugLock',
		type: 'checkbox',
		defaultValue: true,
		admin: {
			hidden: true,
			position: 'sidebar',
		},
		...checkboxOverrides,
	};

	// @ts-expect-error - ts mismatch Partial<TextField> with TextField
	const slugField: TextField = {
		name: 'slug',
		type: 'text',
		index: true,
		label: 'Slug',
		...(slugOverrides ?? {}),
		hooks: {
			// Kept this in for hook or API based updates
			beforeValidate: [formatSlugHook(fieldToUse)],
		},
		admin: {
			position: 'sidebar',
			...(slugOverrides?.admin ?? {}),
			components: {
				Field: {
					path: '@/_components/admin/SlugField#default',
					clientProps: {
						fieldToUse,
						checkboxFieldPath: checkBoxField.name,
					},
				},
			},
		},
	};

	return [slugField, checkBoxField];
};

export default slugField;
