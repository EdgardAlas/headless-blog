interface ApiKeyRow {
	id: string;
	canBeDeleted: boolean;
	updatedAt?: Date | string | null;
	name: string;
	apiKey: string;
}
