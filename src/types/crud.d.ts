import { FieldConfigItem } from '@components/auto-form/types';
import { Role } from '@constants/roles';
import { ColumnDef } from '@tanstack/react-table';

export interface CrudOptions {
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
	deleteAction: AnyFunction;
	createAction: AnyFunction;
	updateAction: AnyFunction;
	getAction: AnyFunction;
}

export interface CrudMap {
	[key: string]: {
		columns: ColumnDef<any, unknow>[];
		roles: Role[];
		crud: CrudOptions;
		getData: (
			query: string,
			page: number,
			size: number
		) => () => Promise<WithPagination<any[]>>;
		fieldConfig?: Record<string, FieldConfigItem>;
	};
}
