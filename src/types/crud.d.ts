import { FieldConfigItem } from '@components/auto-form/types';
import { Role } from '@constants/roles';
import { ColumnDef } from '@tanstack/react-table';
import { Metadata } from 'next';

export interface CrudFormInfo {
	create: {
		title: string;
		validation: any;
	};
	update: {
		title: string;
		validation: any;
	};
	delete: {
		title: string;
	};
	deleteAction?: AnyFunction;
	createAction?: AnyFunction;
	updateAction?: AnyFunction;
	getAction?: AnyFunction;
	noEdit?: boolean;
	noDelete?: boolean;
}

export interface CrudConfiguration {
	columns: ColumnDef<any, unknow>[];
	roles: Role[];
	crud: CrudFormInfo;
	getData: (
		query: string,
		page: number,
		size: number
	) => () => Promise<WithPagination<any[]>>;
	fieldConfig?: Record<string, FieldConfigItem>;
	seo: Metadata;
}

export interface CrudMap {
	[key: string]: CrudConfiguration;
}
