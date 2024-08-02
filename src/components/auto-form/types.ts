/* eslint-disable no-unused-vars */
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import * as z from 'zod';
import { INPUT_COMPONENTS } from './config';

export type FieldConfigItem = {
	description?: React.ReactNode;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement> & {
		showLabel?: boolean;
	};
	label?: string;
	fieldType?:
		| keyof typeof INPUT_COMPONENTS
		| React.FC<AutoFormInputComponentProps>;
	hidden?: boolean;
	renderParent?: (props: {
		children: React.ReactNode;
	}) => React.ReactElement | null;
};

export type FieldConfig<SchemaType extends z.infer<z.ZodObject<TODO, TODO>>> = {
	// If SchemaType.key is an object, create a nested FieldConfig, otherwise FieldConfigItem
	[Key in keyof SchemaType]?: SchemaType[Key] extends object
		? FieldConfig<z.infer<SchemaType[Key]>>
		: FieldConfigItem;
};

export enum DependencyType {
	DISABLES,
	REQUIRES,
	HIDES,
	SETS_OPTIONS,
}

type BaseDependency<SchemaType extends z.infer<z.ZodObject<TODO, TODO>>> = {
	sourceField: keyof SchemaType;
	type: DependencyType;
	targetField: keyof SchemaType;
	when: (sourceFieldValue: TODO, targetFieldValue: TODO) => boolean;
};

export type ValueDependency<
	SchemaType extends z.infer<z.ZodObject<TODO, TODO>>,
> = BaseDependency<SchemaType> & {
	type:
		| DependencyType.DISABLES
		| DependencyType.REQUIRES
		| DependencyType.HIDES;
};

export type EnumValues = readonly [string, ...string[]];

export type OptionsDependency<
	SchemaType extends z.infer<z.ZodObject<TODO, TODO>>,
> = BaseDependency<SchemaType> & {
	type: DependencyType.SETS_OPTIONS;

	// Partial array of values from sourceField that will trigger the dependency
	options: EnumValues;
};

export type Dependency<SchemaType extends z.infer<z.ZodObject<TODO, TODO>>> =
	| ValueDependency<SchemaType>
	| OptionsDependency<SchemaType>;

/**
 * A FormInput component can handle a specific Zod type (e.g. "ZodBoolean")
 */
export type AutoFormInputComponentProps = {
	zodInputProps: React.InputHTMLAttributes<HTMLInputElement>;
	field: ControllerRenderProps<FieldValues, TODO>;
	fieldConfigItem: FieldConfigItem;
	label: string;
	isRequired: boolean;
	fieldProps: TODO;
	zodItem: z.ZodAny;
	className?: string;
};
