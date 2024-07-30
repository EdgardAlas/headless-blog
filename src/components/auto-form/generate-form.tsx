import AutoFormObject from '@components/auto-form/fields/object';
import { Dependency, FieldConfig } from '@components/auto-form/types';
import {
	ZodObjectOrWrapped,
	getObjectFormSchema,
} from '@components/auto-form/utils';
import { z } from 'zod';

export const GenerateForm = <SchemaType extends ZodObjectOrWrapped>({
	formSchema,
	fieldConfig,
	dependencies,
	form,
}: {
	formSchema: SchemaType;
	values?: Partial<z.infer<SchemaType>>;
	fieldConfig?: FieldConfig<z.infer<SchemaType>>;
	dependencies?: Dependency<z.infer<SchemaType>>[];
	form: ReturnType<any>;
}) => {
	const objectFormSchema = getObjectFormSchema(formSchema);
	return (
		<AutoFormObject
			schema={objectFormSchema}
			form={form}
			dependencies={dependencies}
			fieldConfig={fieldConfig}
		/>
	);
};

