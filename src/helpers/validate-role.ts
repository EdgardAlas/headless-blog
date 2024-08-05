import { Role } from '@/constants/roles';
import { currentUser } from '@lib/current-user';
import { redirect } from 'next/navigation';

export const validateRole = async (roles: Role[] = []) => {
	const user = await currentUser();

	if (!user) redirect('/login');

	if (
		!roles.includes(user.role) &&
		!['admin', 'super-admin'].includes(user.role) &&
		roles.length > 0
	)
		redirect('/');

	return {
		userRole: user.role,
		user,
	};
};
