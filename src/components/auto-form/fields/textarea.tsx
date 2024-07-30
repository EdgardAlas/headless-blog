import { Textarea } from '@/components/ui/textarea';
import { FormInput } from '@components/form/form-input';
import { AutoFormInputComponentProps } from '../types';

export default function AutoFormTextarea({
	label,
	isRequired,
	fieldConfigItem,
	fieldProps,
}: AutoFormInputComponentProps) {
	const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;

	return (
		<FormInput
			input={Textarea}
			label={fieldConfigItem?.label || label}
			isRequired={isRequired}
			description={fieldConfigItem?.description}
			{...fieldPropsWithoutShowLabel}
		/>
	);
}

