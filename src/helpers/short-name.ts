export const shortName = (name: string): string => {
	const [firstName, lastName] = name.split(' ');
	return `${firstName?.[0]?.toUpperCase() ?? ''}${
		lastName?.[0]?.toUpperCase() ?? ''
	}`.trim();
};
