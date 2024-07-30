import { Input } from '@/components/ui/input';
import { FormInput } from '@components/form/form-input';
import { AutoFormInputComponentProps } from '../types';

export default function AutoFormInput({
	label,
	isRequired,
	fieldConfigItem,
	fieldProps,
}: AutoFormInputComponentProps) {
	const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;

	return (
		<FormInput
			input={Input}
			label={fieldConfigItem?.label || label}
			isRequired={isRequired}
			description={fieldConfigItem?.description}
			{...fieldPropsWithoutShowLabel}
		/>
	);
}
