'use client';
import { MenuItem } from '@/constants/menu';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@components/ui/accordion';
import { Button } from '@components/ui/button';
import { cn } from '@lib/cn';
import { AccordionSingleProps } from '@radix-ui/react-accordion';
import Link from 'next/link';

interface SidebarLinkProps {
	item: MenuItem;
	pathname: string;
}

export const SidebarLink = ({ item, pathname }: SidebarLinkProps) => {
	return (
		<Button
			variant={'ghost'}
			className={cn('w-full justify-start gap-2', {
				'bg-primary text-white': item.link === pathname,
			})}
			asChild
		>
			<Link href={item.link || '#'}>
				{item.icon ? <item.icon size={16} /> : null}
				{item.title}
			</Link>
		</Button>
	);
};

export const SidebarAccordion = ({
	item,
	pathname,
	shouldShow,
	...props
}: SidebarLinkProps &
	AccordionSingleProps & {
		shouldShow: boolean;
	}) => {
	return (
		<Accordion collapsible {...props} type='single'>
			<AccordionItem value={item.title} className='border-none'>
				<AccordionTrigger className='inline-flex h-10 items-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
					<span className='flex items-center gap-2'>
						{item.icon ? <item.icon size={16} /> : null}
						{item.title}
					</span>
				</AccordionTrigger>
				<AccordionContent className='pl-4 pt-2'>
					{item.items?.map(
						(subsubitem, subsubindex) =>
							shouldShow && (
								<SidebarLink
									key={subsubindex}
									item={subsubitem}
									pathname={pathname}
								/>
							)
					)}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};
