import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { currentUser } from '@lib/current-user';

export const UserAvatar = async () => {
	const user = await currentUser();

	return (
		<div>
			<Avatar>
				<AvatarImage
					src={user?.image ?? 'https://api.dicebear.com/8.x/lorelei/png'}
				/>
				<AvatarFallback>User</AvatarFallback>
			</Avatar>
		</div>
	);
};
