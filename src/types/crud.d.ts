import { FieldConfigItem } from '@components/auto-form/types';
import { Role } from '@constants/roles';
import { ColumnDef } from '@tanstack/react-table';
import { Metadata } from 'next';

export interface CrudFormInfo {
	create: {
		title: string;
		validation: TODO;
		createAction?: TODOFunction;
	};
	update: {
		title: string;
		validation: TODO;
		updateAction?: TODOFunction;
		noEdit?: boolean;
	};
	delete: {
		title: string;
		deleteAction?: TODOFunction;
		noDelete?: boolean;
	};
	get: {
		getAction?: TODOFunction;
	};
}

export interface CrudConfiguration {
	columns: ColumnDef<TODO, unknow>[];
	roles: Role[];
	crud: CrudFormInfo;
	getData: (
		query: string,
		page: number,
		size: number
	) => () => Promise<WithPagination<TODO[]>>;
	fieldConfig?: Record<string, FieldConfigItem>;
	seo: Metadata;
}

export type CrudMap<T> = Record<T, CrudConfiguration>;
