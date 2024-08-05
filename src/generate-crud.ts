/* eslint-disable no-console */
import { execSync } from 'child_process';
import { program } from 'commander';
import fs from 'fs';

program.option('-m, --model <model>', 'Model name');
program.option('-r, --remove', 'Remove crud files');
program.option('-nu, --noupdate', 'Do not update index.ts and modals.ts');

program.parse(process.argv);

const options = program.opts<{
	model: string;
	remove: boolean;
	noupdate: boolean;
}>();

const modelName = `${toPascalCase(options.model)}Model`;
const documentName = `${toPascalCase(options.model)}Document`;
const rowName = `${toPascalCase(options.model)}Row`;
const variableName = toCamelize(options.model.toLowerCase());
const fileName = options.model.toLowerCase();
const pascalName = toPascalCase(options.model);
const validationName = `${pascalName}Validation`;
const columnsName = `${pascalName}Columns`;

import('./models/' + options.model + '.model').then((model) => {
	/* const fields = model.ApikeyModel.schema.obj; */

	/* if (options.remove) {
		try {
			fs.rmdirSync('./src/crud/' + options.model.toLowerCase(), {
				recursive: true,
			});
		} catch (error) {
		}
	} */

	const fields = model.Schema.obj;
	const fieldNames = Object.keys(fields);

	const fieldDatatype = fieldNames.map((fieldName) => {
		const getKey = (): string => {
			if (model.Schema.path(fieldName)?.caster?.instance) {
				return 'array.' + model.Schema.path(fieldName).caster.instance;
			}

			if (model.Schema.path(fieldName)?.instance) {
				return model.Schema.path(fieldName).instance;
			}

			return 'any';
		};

		return {
			name: fieldName,
			type: mongoDatatypesToTypescript[
				getKey() as keyof typeof mongoDatatypesToTypescript
			] as string,
			/* fields[fieldName].type.name as keyof typeof mongoDatatypesToTypescript */
		};
	});

	// create folder in ./crud/<model>

	if (!fs.existsSync('./src/crud/' + options.model.toLowerCase())) {
		fs.mkdirSync(`./src/crud/${options.model.toLowerCase()}`, {
			recursive: true,
		});
	}

	// create definition file
	createDefinitionFile(options.model, fieldDatatype);

	// create dao.ts
	createDaoFile(options.model, fieldDatatype);

	// create validations.ts
	createValidationsFile(options.model, fieldDatatype);

	// create _containers/columns.tsx
	createColumnsFile(options.model, fieldDatatype);

	// create actions.ts
	createActionsFile(options.model, fieldDatatype);

	// create modal.ts
	createModalFile(options.model);

	// create crud.ts
	createCrudFile(options.model);

	if (!options.noupdate) {
		// update modals.tss
		updateCrudModalsFile();

		// update index.ts
		updateIndexFile();
	}

	// execute prettier on all files
	fs.readdirSync('./src/crud/' + options.model.toLowerCase()).forEach(
		(file) => {
			console.log('Formatting ' + file + '...');
			execSync(
				'npx prettier --write ./src/crud/' +
					options.model.toLowerCase() +
					'/' +
					file
			);
		}
	);

	console.log('Formatting modals.ts...');
	execSync('npx prettier --write ./src/crud/modals.ts');

	console.log("formatting 'src/crud/index.tsx'...");
	execSync('npx prettier --write ./src/crud/index.tsx');

	console.log('Done!');
	console.log("Don't forget to add the new crud to the sidebar");
});

function createDefinitionFile(
	model: string,
	fields: { name: string; type: string }[]
) {
	console.log('Creating definition file...');
	fs.writeFileSync(
		'./src/crud/' + model.toLowerCase() + '/' + model.toLowerCase() + '.d.ts',
		`interface ${rowName} {
		id: string;
		canBeDeleted: boolean;
		updatedAt?: Date | string | null;
	${fields.map((field) => `	${field.name}: ${field.type};`).join('\n')}
	}`
	);
}

function createDaoFile(
	model: string,
	fields: { name: string; type: string }[]
) {
	console.log('Creating dao file...');

	fs.writeFileSync(
		'./src/crud/' + model.toLowerCase() + '/dao.ts',
		`
	import { mapToPagination } from '@helpers/map-to-pagination';
	import { connectDB } from '@lib/db';
	import { ${modelName}, ${documentName} } from '@models/${fileName}.model';
	import { PaginateResult } from 'mongoose';
	import { currentUser } from '@lib/current-user';
	import { formatDate } from '@lib/format-dates';
	
	export const find${pascalName}ById = async (id: string) => {
		await connectDB();
	
		return ${modelName}.findById(id);
	};
	
	export const insert${pascalName} = async (${variableName}: Partial<${documentName}>) => {
		await connectDB();
	
		return ${modelName}.create(${variableName});
	
	};
	
	export const update${pascalName} = async (id: string, ${variableName}: Partial<${documentName}>) => {
		await connectDB();
	
		return ${modelName}.findByIdAndUpdate(id, ${variableName}, { new: true });
	};
	
	export const delete${pascalName} = async (id: string) => {
		await connectDB();
	
		return ${modelName}.findByIdAndDelete(id);
	};
	
	export const get${pascalName}sPaginated =
		(
			query: string,
			page: number,
			size: number
		): (() => Promise<WithPagination<${rowName}[]>>) =>	
		async () => {
			await connectDB();
			const ${variableName} = await currentUser();
	
			if (!${variableName}) {
				return {
					data: [],
					page: 1,
					size: 7,
					totalPages: 1,
				};
			}
	
			const ${variableName}s = await ${modelName}.paginate(
				{
				
				},
				{
					page: page,
					limit: size,
					sort: {
						updatedAt: -1,
					},
				}
			);
	
			return map${pascalName}ResponseTo${pascalName}RowArray(${variableName}s);
		};
	
	// mappers functions
	
	export const map${pascalName}ResponseTo${pascalName}RowArray = async (
		${variableName}s: PaginateResult<${documentName}>
	) => {
		
		return mapToPagination<${rowName}>(${variableName}s, (${variableName}: ${documentName}) => {
			return {
				id: ${variableName}.id.toString(),
				${fields.map((field) => `${field.name}: ${variableName}.${field.name},`).join('\n')}
				canBeDeleted: true,
				updatedAt: formatDate(${variableName}.updatedAt).format('LLL'),
			};
		});
	
	};
		`
	);
}

function createValidationsFile(
	model: string,
	fields: { name: string; type: string }[]
) {
	console.log('Creating validations file...');

	fs.writeFileSync(
		'./src/crud/' + model.toLowerCase() + '/validations.ts',
		`
	import { z } from 'zod';

	export const create${validationName} = z.object({
	${fields.map((field) => `${field.name}: ${dataTypeToZod[field.type as keyof typeof dataTypeToZod]},`).join('\n')}
	});

	export const update${validationName} = z.object({
		id: z.string().min(1, {
			message: 'Id must be a valid string',
		}),
		${fields.map((field) => `${field.name}: ${dataTypeToZod[field.type as keyof typeof dataTypeToZod]},`).join('\n')}
	});
	
	`
	);
}

function createColumnsFile(
	model: string,
	fields: { name: string; type: string }[]
) {
	console.log('Creating columns file...');

	fs.mkdirSync('./src/crud/' + model.toLowerCase() + '/_containers', {
		recursive: true,
	});

	fs.writeFileSync(
		'./src/crud/' + model.toLowerCase() + '/_containers/columns.tsx',
		`
	'use client';

	import { CrudActions } from '@components/crud/crud-actions';
	import { ColumnDef } from '@tanstack/react-table';
	
	export const ${columnsName}: ColumnDef<${rowName}>[] = [
		{
			header: 'Id',
			accessorKey: 'id',
		},
		${fields
			.map(
				(field) =>
					`{
			header: '${toPascalCase(field.name)}',
			accessorKey: '${field.name}',
		}`
			)
			.join(',\n')}
		,{
			header: 'Last Updated',
			accessorKey: 'updatedAt',
		},
		{
			header: '',
			accessorKey: 'actions',
			cell: ({ row: { original } }) => {
				return (
					<CrudActions
						canBeDeleted={original.canBeDeleted}
						crud='${fileName}s'
						id={original.id}
					/>
				);
			},
		},
	];
		`
	);
}

function createActionsFile(
	model: string,
	fields: { name: string; type: string }[]
) {
	console.log('Creating actions file...');

	fs.writeFileSync(
		'./src/crud/' + model.toLowerCase() + '/actions.ts',
		`
	'use server';

	import { CustomError } from '@/helpers/custom-error';
	import { idValidation } from '@/validations/id.validations';
	import { create${validationName}, update${validationName} } from '@/crud/${fileName}/validations';
	import { revalidatePath } from 'next/cache';

	import {
		delete${pascalName},
		find${pascalName}ById,
		insert${pascalName},
		update${pascalName},
	} from '@/crud/${fileName}/dao';

	import { authAction } from '@lib/safe-action';

	export const create${pascalName}Action = authAction
		.metadata({
			roles: ['admin', 'user'],
		})
		.schema(create${validationName})
		.action(async ({ parsedInput: values }) => {
			
			await insert${pascalName}({
				${fields.map((field) => `${field.name}: values.${field.name},`).join('\n')}
			});

			revalidatePath('/${fileName}s');

			return '${pascalName} created successfully';
		});

	export const update${pascalName}Action = authAction
		.metadata({
			roles: ['admin', 'user'],
		})
		.schema(update${validationName})
		.action(async ({ parsedInput: values }) => {
			
			await update${pascalName}(values.id, {
				${fields.map((field) => `${field.name}: values.${field.name},`).join('\n')}
			});

			revalidatePath('/${fileName}s');

			return '${pascalName} updated successfully';
		});

	export const delete${pascalName}Action = authAction
		.metadata({
			roles: ['admin', 'user'],
		})
		.schema(idValidation)
		.action(async ({ parsedInput: values }) => {
			const ${variableName} = await find${pascalName}ById(values.id);

			if (!${variableName}) {
				throw new CustomError('${pascalName} not found');
			}

			await delete${pascalName}(values.id);

			revalidatePath('/${fileName}s');

			return '${pascalName} deleted successfully';
		});

	export const get${pascalName}ByIdAction = authAction
		.metadata({
			roles: ['admin', 'user'],
		})
		.schema(idValidation)
		.action(async ({ parsedInput: values }) => {
			const ${variableName} = await find${pascalName}ById(values.id);

			if (!${variableName}) {
				throw new CustomError('${pascalName} not found');
			}

			const ${variableName}Row: ${rowName} = {
				id: ${variableName}.id.toString(),
				${fields.map((field) => `${field.name}: ${variableName}.${field.name},`).join('\n')}
				canBeDeleted: true,
			};

			return ${variableName}Row;
		});




	`
	);
}

function createModalFile(model: string) {
	console.log('Creating modal file...');

	fs.writeFileSync(
		'./src/crud/' + model.toLowerCase() + '/modal.ts',
		`
	import * as ${variableName}Actions from '@/crud/${fileName}/actions';
	import * as ${variableName}Validations from '@/crud/${fileName}/validations';
	import { CrudFormInfo } from '@/types/crud';

	export const ${variableName}CrudModalInfo: CrudFormInfo = {
		create: {
			title: 'Create ${pascalName}',
			validation: ${variableName}Validations.create${validationName},
			createAction: ${variableName}Actions.create${pascalName}Action,
		},
		update: {
			title: 'Update ${pascalName}',
			validation: ${variableName}Validations.update${validationName},
			updateAction: ${variableName}Actions.update${pascalName}Action,
		},
		delete: {
			title: 'Delete ${pascalName}',
			deleteAction: ${variableName}Actions.delete${pascalName}Action,
		},
		get: {
			getAction: ${variableName}Actions.get${pascalName}ByIdAction,
		},
	};
		`
	);
}

function createCrudFile(model: string) {
	console.log('Creating crud file...');

	fs.writeFileSync(
		'./src/crud/' + model.toLowerCase() + '/crud.ts',
		`
	import { ${pascalName}Columns } from '@/crud/${fileName}/_containers/columns';
	import { get${pascalName}sPaginated } from '@/crud/${fileName}/dao';
	import { CrudConfiguration } from '@/types/crud';
	import { ${variableName}CrudModalInfo } from './modal';

	export const ${variableName}Crud: CrudConfiguration = {
		roles: ['admin', 'user'],
		columns: ${pascalName}Columns,
		crud: ${variableName}CrudModalInfo,
		getData: get${pascalName}sPaginated,
		seo: {
			title: '${pascalName}',
			description: 'Manage ${variableName}',
		},
	};
		`
	);
}

function updateCrudModalsFile() {
	const crudModalsFile = './src/crud/modals.ts';
	const crudModalsContent = fs.readFileSync(crudModalsFile, 'utf-8');

	const newImport = `import { ${variableName}CrudModalInfo } from '@/crud/${fileName}/modal';
	import { CrudFormInfo } from '@/types/crud';`;
	const newKey = `['${options.model.toLowerCase()}s']: ${variableName}CrudModalInfo,`;

	const newContent = crudModalsContent
		.replace(/import { CrudFormInfo } from '@\/types\/crud';/, newImport)
		.replace(
			/export const crudValidations: Record<CrudValidationKeys, CrudFormInfo> = {/,
			`export const crudValidations: Record<CrudValidationKeys, CrudFormInfo> = {
			${newKey}`
		);

	const lines = newContent.split('\n');
	const newLines = lines.map((line) => {
		if (line.includes('export type CrudValidationKeys')) {
			line = line
				.replace(';', '')
				.concat(` | '${options.model.toLowerCase()}s'`);
		}
		return line;
	});

	fs.writeFileSync(crudModalsFile, newLines.join('\n'));
}

function updateIndexFile() {
	console.log('Updating index file...');

	const indexFile = './src/crud/index.tsx';
	const indexContent = fs.readFileSync(indexFile, 'utf-8');

	const newImport = `import { ${variableName}Crud } from '@/crud/${fileName}/crud';
	import { CrudMap } from '@/types/crud';`;
	const newKey = `['${options.model.toLowerCase()}s']: ${variableName}Crud,`;

	const newContent = indexContent
		.replace(/import { CrudMap } from '@\/types\/crud';/, newImport)
		.replace(
			/export const crudPages: CrudMap<CrudValidationKeys> = {/,
			`export const crudPages: CrudMap<CrudValidationKeys> = {
			${newKey}`
		);

	fs.writeFileSync(indexFile, newContent);
}

// helpers

function toCamelize(str: string) {
	return str
		.split('-')
		.join(' ')
		.split(' ')
		.map((word, index) => {
			if (index === 0) {
				return word.toLowerCase();
			}
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		})
		.join('');
}

const mongoDatatypesToTypescript = {
	String: 'string',
	Number: 'number',
	Date: 'Date | string | null',
	ObjectId: 'ObjectId',
	Boolean: 'boolean',
	'array.String': 'string[]',
	'array.ObjectId': 'ObjectId[]',
	'array.Number': 'number[]',
	'array.Date': 'Date[]',
	'array.Boolean': 'boolean[]',
	any: 'any',
};

const dataTypeToZod = {
	string: 'z.string()',
	number: 'z.number()',
	Date: 'z.date()',
	'Date | string | null': 'z.date().nullable()',
	ObjectId: 'z.string()',
	boolean: 'z.boolean()',
	'string[]': 'z.array(z.string())',
	'ObjectId[]': 'z.array(z.string())',
	'number[]': 'z.array(z.number())',
	'Date[]': 'z.array(z.date())',
	'boolean[]': 'z.array(z.boolean())',
	array: 'z.array(z.any())',
};

function toPascalCase(str: string) {
	return (
		str
			.match(
				/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
			)
			?.map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
			.join('') || ''
	);
}
