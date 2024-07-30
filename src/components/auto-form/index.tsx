'use client';

import React from 'react';
import {
	DefaultValues,
	FormProvider,
	SubmitErrorHandler,
	SubmitHandler,
	useForm,
	useFormContext,
} from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { zodResolver } from '@hookform/resolvers/zod';

import AutoFormObject from './fields/object';
import { Dependency, FieldConfig } from './types';
import {
	ZodObjectOrWrapped,
	getDefaultValues,
	getObjectFormSchema,
} from './utils';

export function AutoFormSubmit({
	children,
	className,
	disabled,
}: {
	children?: React.ReactNode;
	className?: string;
	disabled?: boolean;
}) {
	const form = useFormContext();

	return (
		<Button
			type='submit'
			disabled={disabled ? disabled : form.formState.isSubmitting}
			className={className}
			loading={form.formState.isSubmitting}
		>
			{children ?? 'Submit'}
		</Button>
	);
}

function AutoForm<SchemaType extends ZodObjectOrWrapped>({
	formSchema,
	values: valuesProp,
	onValuesChange: onValuesChangeProp,
	onParsedValuesChange,
	onSubmit: onSubmitProp,
	fieldConfig,
	children,
	className,
	dependencies,
	onValidationErrors,
	defaultValues: defaultValuesProp,
}: {
	formSchema: SchemaType;
	values?: Partial<z.infer<SchemaType>>;
	onValuesChange?: (_values: Partial<z.infer<SchemaType>>) => void;
	onParsedValuesChange?: (_values: Partial<z.infer<SchemaType>>) => void;
	onSubmit?: SubmitHandler<z.infer<SchemaType>>;
	onValidationErrors?: SubmitErrorHandler<z.infer<SchemaType>>;
	fieldConfig?: FieldConfig<z.infer<SchemaType>>;
	children?: React.ReactNode;
	className?: string;
	dependencies?: Dependency<z.infer<SchemaType>>[];
	defaultValues?: DefaultValues<z.infer<SchemaType>>;
}) {
	const objectFormSchema = getObjectFormSchema(formSchema);
	const defaultValues: DefaultValues<z.infer<typeof objectFormSchema>> | null =
		getDefaultValues(objectFormSchema, fieldConfig);

	const form = useForm<z.infer<typeof objectFormSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValuesProp ?? defaultValues ?? undefined,
		values: valuesProp,
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const parsedValues = formSchema.safeParse(values);
		if (parsedValues.success) {
			await onSubmitProp?.(parsedValues.data);
		}
	}

	const values = form.watch();
	// valuesString is needed because form.watch() returns a new object every time
	const valuesString = JSON.stringify(values);

	React.useEffect(() => {
		onValuesChangeProp?.(values);
		const parsedValues = formSchema.safeParse(values);
		if (parsedValues.success) {
			onParsedValuesChange?.(parsedValues.data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [valuesString]);

	return (
		<div className='w-full'>
			<FormProvider {...form}>
				<form
					//@ts-ignore
					onSubmit={form.handleSubmit(onSubmit, onValidationErrors)}
					className={cn('space-y-5', className)}
					noValidate={true}
				>
					<AutoFormObject
						schema={objectFormSchema}
						form={form}
						dependencies={dependencies}
						fieldConfig={fieldConfig}
					/>

					{children}
				</form>
			</FormProvider>
		</div>
	);
}

export default AutoForm;
