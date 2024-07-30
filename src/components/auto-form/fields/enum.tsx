import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { FormInput } from '@components/form/form-input';
import * as z from 'zod';
import { AutoFormInputComponentProps } from '../types';
import { getBaseSchema } from '../utils';

export default function AutoFormEnum({
	label,
	isRequired,
	field,
	fieldConfigItem,
	zodItem,
	fieldProps,
}: AutoFormInputComponentProps) {
	const baseValues = (getBaseSchema(zodItem) as unknown as z.ZodEnum<any>)._def
		.values;

	let values: [string, string][] = [];
	if (!Array.isArray(baseValues)) {
		values = Object.entries(baseValues);
	} else {
		values = baseValues.map((value) => [value, value]);
	}

	function findItem(value: any) {
		return values.find((item) => item[0] === value);
	}

	return (
		<FormInput
			input={Select}
			onValueChange={field.onChange}
			defaultValue={field.value}
			label={fieldConfigItem?.label || label}
			isRequired={isRequired}
			{...fieldProps}
		>
			<SelectTrigger className={fieldProps.className}>
				<SelectValue placeholder={fieldConfigItem.inputProps?.placeholder}>
					{field.value ? findItem(field.value)?.[1] : 'Select an option'}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{values.map(([value, label]) => (
					<SelectItem value={label} key={value}>
						{label}
					</SelectItem>
				))}
			</SelectContent>
		</FormInput>
	);
}
