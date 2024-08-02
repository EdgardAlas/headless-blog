import { FieldConfigItem } from '@components/auto-form/types';
import { Role } from '@constants/roles';
import { ColumnDef } from '@tanstack/react-table';
import { Metadata } from 'next';

export interface CrudFormInfo {
	create: {
		title: string;
		validation: TODO;
	};
	update: {
		title: string;
		validation: TODO;
	};
	delete: {
		title: string;
	};
	deleteAction?: TODOFunction;
	createAction?: TODOFunction;
	updateAction?: TODOFunction;
	getAction?: TODOFunction;
	noEdit?: boolean;
	noDelete?: boolean;
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

export interface CrudMap {
	[key: string]: CrudConfiguration;
}
