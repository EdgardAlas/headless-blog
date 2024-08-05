'use client';
import { MenuItem, menu } from '@/constants/menu';
import { Role } from '@/constants/roles';
import { CloseSidebarButton } from '@/app/(dashboard)/_containers/close-sidebar-button';
import {
	SidebarAccordion,
	SidebarLink,
} from '@/app/(dashboard)/_containers/sidebar-items';
import { Button } from '@components/ui/button';
import { ScrollArea } from '@components/ui/scroll-area';
import { useSidebar } from '@context/use-sidebar';
import { cn } from '@lib/cn';
import { LayoutDashboard, LogOut, LucideSidebarClose } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { logout } from '@/app/(auth)/actions';

interface SidebarProps {
	role: Role;
}

export const Sidebar = ({ role }: SidebarProps) => {
	const pathname = usePathname();
	const { isOpen, setOpen } = useSidebar();

	const [defaultAccordion, setDefaultAccordion] = useState<string>();
	const selecteditem = useMemo(() => {
		const menuItemsWithLinks = menu
			.filter((item) => item.items && item.items.length > 0)
			.map((item) => item.items)
			.filter((item) => item && item.length > 0)
			.flat();

		const selecteditem = menuItemsWithLinks.find((item) =>
			item?.items?.some((subitem) => subitem.link === pathname)
		);

		return selecteditem;
	}, [pathname]);

	useEffect(() => {
		setTimeout(() => {
			setDefaultAccordion(selecteditem?.title || '');
		}, 300);
	}, [pathname, selecteditem]);

	useEffect(() => {
		const match = window.matchMedia('(min-width: 1024px)');

		const handleResize = () => {
			if (match.matches) {
				setOpen(false);
			}
		};

		match.addEventListener('change', handleResize);

		return () => {
			match.removeEventListener('change', handleResize);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setOpen(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const shouldShow = (item: MenuItem) => {
		return (
			item.roles.length === 0 ||
			item.roles.includes(role) ||
			role === 'admin' ||
			role === 'super-admin'
		);
	};

	const shouldShowSubItem = (item: MenuItem) => {
		return (
			item.items?.length === 0 ||
			item.items?.some((subitem) => {
				if (role === 'admin' || role === 'super-admin') {
					return true;
				}

				if (subitem.roles.length === 0 && subitem.items?.length === 0) {
					return true;
				}

				if (subitem.roles.length > 0 && subitem.roles.includes(role)) {
					return true;
				}

				if (subitem.items?.length) {
					return subitem.items.some((subsubitem) =>
						subsubitem.roles.includes(role)
					);
				}

				return false;
			})
		);
	};

	return (
		<article
			aria-hidden={!isOpen}
			onClick={() => setOpen(false)}
			className={cn(
				'fixed top-0 z-30 h-dvh max-lg:w-full max-lg:bg-black/50 md:col-span-3 lg:sticky lg:col-span-3 xl:col-span-2',
				{
					'max-lg:pointer-events-none max-lg:select-none max-lg:!bg-transparent':
						!isOpen,
				}
			)}
		>
			<aside
				onClick={(e) => e.stopPropagation()}
				className={cn(
					'flex h-full w-60 flex-col gap-4 bg-white p-4 shadow-md transition-transform sm:w-72 md:w-80 lg:w-full',
					{
						'max-lg:-translate-x-full': !isOpen,
					}
				)}
			>
				<section className='flex items-center justify-between gap-4 lg:justify-center'>
					<Link href='/admin'>
						<h2 className='text-center text-lg font-bold text-gray-800'>
							JocoteSV
						</h2>
					</Link>
					<CloseSidebarButton className='lg:hidden'>
						<LucideSidebarClose size={24} />
					</CloseSidebarButton>
				</section>

				<ScrollArea className='flex-1'>
					<article className='grid gap-6'>
						{menu.map((item, index) =>
							item.items ? (
								shouldShowSubItem(item) && (
									<section key={index} className='grid'>
										<p className='mb-2 px-4 text-sm font-bold text-gray-600'>
											{item.title}
										</p>

										{item.items.map((subitem, subindex) =>
											subitem.link
												? shouldShow(subitem) && (
														<SidebarLink
															key={subindex}
															item={subitem}
															pathname={pathname}
														/>
													)
												: shouldShowSubItem(subitem) && (
														<SidebarAccordion
															type='single'
															key={subindex}
															item={subitem}
															pathname={pathname}
															shouldShow={shouldShow(subitem)}
															value={defaultAccordion}
															onValueChange={(value) =>
																setDefaultAccordion(value)
															}
														/>
													)
										)}
									</section>
								)
							) : item.link && shouldShow(item) ? (
								<Button
									key={index}
									variant={'ghost'}
									className={cn('w-full justify-start gap-2', {
										'bg-primary text-white': item.link === pathname,
									})}
									asChild
								>
									<Link href={item.link}>
										<LayoutDashboard size={16} />
										{item.title}
									</Link>
								</Button>
							) : null
						)}
					</article>
				</ScrollArea>

				<Button
					variant={'ghost'}
					className='gap-2'
					onClick={() => {
						logout();
					}}
				>
					<LogOut size={16} />
					Logout
				</Button>
			</aside>
		</article>
	);
};
