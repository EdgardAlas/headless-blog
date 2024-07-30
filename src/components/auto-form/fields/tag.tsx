import { FormInput } from '@components/form/form-input';
import { InputTags } from '@components/ui/input-tag';
import { AutoFormInputComponentProps } from '../types';

export default function AutoFormTagInput({
	label,
	isRequired,
	fieldConfigItem,
	fieldProps,
}: AutoFormInputComponentProps) {
	const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;

	return (
		<FormInput
			input={InputTags}
			label={fieldConfigItem?.label || label}
			isRequired={isRequired}
			description={fieldConfigItem?.description}
			{...fieldPropsWithoutShowLabel}
		/>
	);
}
