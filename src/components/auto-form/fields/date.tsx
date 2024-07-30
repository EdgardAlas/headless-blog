import { DatePicker } from '@/components/ui/date-picker';
import { FormInput } from '@components/form/form-input';
import { AutoFormInputComponentProps } from '../types';

export default function AutoFormDate({
	label,
	isRequired,
	field,
	fieldConfigItem,
	fieldProps,
}: AutoFormInputComponentProps) {
	return (
		<FormInput
			input={DatePicker}
			label={fieldConfigItem?.label || label}
			isRequired={isRequired}
			description={fieldConfigItem?.description}
			date={field.value}
			setDate={field.onChange}
			{...fieldProps}
		/>
	);
}
