import { Role } from '@/constants/roles';
import { CustomError } from '@/helpers/custom-error';

export const validateMutation = (role: Role, permittedRoles: Role[]) => {
	if (!permittedRoles.includes(role)) {
		throw new CustomError('You do not have permission');
	}
};
