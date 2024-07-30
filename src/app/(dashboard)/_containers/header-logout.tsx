'use client';
import { logout } from '@/app/(auth)/actions';
import { DropdownMenuItem } from '@components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';

export const HeaderLogout = () => {
	return (
		<DropdownMenuItem
			onClick={() => {
				logout();
			}}
		>
			<LogOut className='mr-2 h-4 w-4' />
			<span>Logout</span>
		</DropdownMenuItem>
	);
};
