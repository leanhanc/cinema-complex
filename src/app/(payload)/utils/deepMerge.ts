type DeepMergeTarget = Record<string, unknown>;

function deepMerge<T extends DeepMergeTarget, S extends DeepMergeTarget>(
	target: T,
	source: S,
): T & S {
	const output = { ...target } as T & S;

	if (isObject(target) && isObject(source)) {
		Object.keys(source).forEach((key) => {
			if (isObject(source[key])) {
				if (!(key in target)) {
					Object.assign(output, { [key]: source[key] });
				} else {
					// @ts-expect-error
					output[key] = deepMerge(
						target[key] as DeepMergeTarget,
						source[key] as DeepMergeTarget,
					);
				}
			} else {
				Object.assign(output, { [key]: source[key] });
			}
		});
	}

	return output;
}

function isObject(item: unknown): item is Record<string, unknown> {
	return Boolean(item && typeof item === 'object' && !Array.isArray(item));
}

export default deepMerge;
