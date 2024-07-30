import { CloseSidebarButton } from '@/app/(dashboard)/_containers/close-sidebar-button';
import { HeaderLogout } from '@/app/(dashboard)/_containers/header-logout';
import { HeaderTitle } from '@/app/(dashboard)/_containers/header-title';
import { UserAvatar } from '@/app/(dashboard)/_containers/user-avatar';
import { Button } from '@components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { MenuIcon } from 'lucide-react';

export const AdminHeader = () => {
	return (
		<header className='sticky top-0 z-20 flex min-h-20 items-center justify-between gap-2 bg-white p-4 px-4 shadow-md md:px-12'>
			<div className='flex items-center gap-2'>
				<CloseSidebarButton className='lg:hidden'>
					<MenuIcon size={24} />
				</CloseSidebarButton>
				<HeaderTitle />
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={'ghost'} size={'icon'}>
						<UserAvatar />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<HeaderLogout />
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
};
