import { FormInput } from '@components/form/form-input';
import { PasswordInput } from '@components/ui/password-input';
import { AutoFormInputComponentProps } from '../types';

export default function AutoFormPassword({
	label,
	isRequired,
	fieldConfigItem,
	fieldProps,
}: AutoFormInputComponentProps) {
	const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;

	return (
		<FormInput
			input={PasswordInput}
			label={fieldConfigItem?.label || label}
			isRequired={isRequired}
			description={fieldConfigItem?.description}
			{...fieldPropsWithoutShowLabel}
		/>
	);
}
