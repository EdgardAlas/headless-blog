'use client';

import { Form } from '@/components/ui/form';
import { ComponentProps, useState } from 'react';
import {
	FieldValues,
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
} from 'react-hook-form';

interface FormContextProps<T extends FieldValues>
	extends Omit<ComponentProps<'form'>, 'onSubmit' | 'onInvalid'> {
	form: UseFormReturn<T>;
	onSubmit: SubmitHandler<T>;
	onInvalid?: SubmitErrorHandler<T>;
}

export const FormContext = <T extends FieldValues>(
	props: FormContextProps<T>
) => {
	const { onInvalid, onSubmit, form, ...rest } = props;
	const [isLoading, setIsLoading] = useState(false);

	return (
		<Form {...form}>
			<form
				noValidate
				{...rest}
				onSubmit={form.handleSubmit(async () => {
					if (isLoading) {
						return;
					}

					setIsLoading(true);
					try {
						await onSubmit(form.getValues());
					} catch (error) {
						throw error;
					} finally {
						setIsLoading(false);
					}
				}, onInvalid)}
			/>
		</Form>
	);
};
