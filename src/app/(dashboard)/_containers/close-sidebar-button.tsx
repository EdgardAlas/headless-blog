'use client';

import { Button, ButtonProps } from '@components/ui/button';
import { useSidebar } from '@context/use-sidebar';

export const CloseSidebarButton = (props: ButtonProps) => {
	const { toggleSidebar } = useSidebar();

	return (
		<Button
			variant={'ghost'}
			size={'icon'}
			onClick={toggleSidebar}
			{...props}
		/>
	);
};
