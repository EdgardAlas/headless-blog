type UserRow = {
	id: string;
	name: string;
	email: string;
	role: Role;
	canBeDeleted: boolean;
	updatedAt: string | Date | null;
	image: string;
	blocked: boolean;
	key?: string;
};
