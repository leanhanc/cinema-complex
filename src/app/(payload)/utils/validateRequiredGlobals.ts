import config from '@payload-config';
import { getPayload } from 'payload';

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
