import { Role } from '@/constants/roles';
import {
	Edit2,
	FilePenIcon,
	Key,
	List,
	Settings,
	Tag,
	User2,
	Users,
} from 'lucide-react';
import { ElementType } from 'react';

export interface MenuItem {
	title: string;
	link?: string;
	icon?: ElementType;
	items?: MenuItem[];
	roles: Role[];
}

export const menu: MenuItem[] = [
	{
		title: 'Dashboard',
		link: '/',
		roles: [],
	},
	{
		title: 'Content',
		roles: [],
		items: [
			{
				title: 'Posts',
				icon: FilePenIcon,
				roles: [],
				items: [
					{
						title: 'All Posts',
						icon: List,
						link: '/posts',
						roles: ['user'],
					},
					{
						title: 'Add New',
						icon: Edit2,
						link: '/posts/new',
						roles: ['user'],
					},
				],
			},
			{
				title: 'Categories',
				icon: List,
				link: '/categories',
				roles: ['user'],
			},
			{
				title: 'Authors',
				icon: User2,
				link: '/authors',
				roles: ['user'],
			},
			{ title: 'Tags', icon: Tag, link: '/tags', roles: ['user'] },
		],
	},
	{
		title: 'Settings',
		roles: [],
		items: [
			{ title: 'Users', icon: Users, link: '/users', roles: ['admin'] },
			{
				title: 'API Keys',
				icon: Key,
				link: '/api-keys',
				roles: ['admin'],
			},
			{
				title: 'Settings',
				icon: Settings,
				link: '/settings',
				roles: ['admin'],
			},
		],
	},
	/* {
		title: 'Logs',
		roles: ['admin'],
		items: [
			{
				title: 'Error Log',
				link: '/logs/error',
				roles: ['admin'],
				icon: List,
			},
		],
	}, */
];
