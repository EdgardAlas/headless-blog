import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { cn } from '@lib/cn';
import { ElementType, useId } from 'react';
import { useFormContext } from 'react-hook-form';

type FormInputProps<T, E extends React.ElementType = typeof Input> = {
	input: E;
	name: T;
	classNames?: {
		container?: string;
		label?: string;
		description?: string;
		message?: string;
	};
	label?: string;
	description?: string;
} & Omit<React.ComponentProps<E>, 'name'>;

/**
 *
 * @param input React.ElementType
 * @param name T
 * @param id string | undefined
 *
 *
 * if generic argument is provided, you should provide the typeof "Component"
 * example:
 * <"email" | "phone", typeof Input>
 */
export const FormInput = <T, E extends React.ElementType>({
	input,
	name,
	id,
	classNames,
	label,
	description,
	className,
	...rest
}: FormInputProps<T, E>) => {
	const Component: ElementType = input;

	const form = useFormContext();
	const error = form.formState.errors[name as string]?.message?.toString();

	const uniqueId = useId();

	const inputId = id || name || uniqueId;

	return (
		<FormField
			control={form.control}
			name={name as string}
			render={({ field }) => (
				<FormItem className={cn('space-y-1', classNames?.container)}>
					<Label htmlFor={inputId as string} className={classNames?.label}>
						{label} {rest.required && <span className='text-red-500'>*</span>}
					</Label>
					<FormControl>
						<Component
							id={inputId}
							{...field}
							{...rest}
							{...form.register(name as string)}
							error={error}
							className={cn(className, {
								'border-red-500 focus-visible:ring-1 focus-visible:ring-red-500':
									error,
							})}
						/>
					</FormControl>
					<FormDescription className={classNames?.description}>
						{description}
					</FormDescription>
					<FormMessage className={classNames?.message}>{error}</FormMessage>
				</FormItem>
			)}
		/>
	);
};
