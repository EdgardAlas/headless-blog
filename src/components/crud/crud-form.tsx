'use client';

import { useConfirm } from '@components/ui/alert-dialog-provider';
import AutoForm, { AutoFormSubmit } from '@components/auto-form';
import { FieldConfig } from '@components/auto-form/types';
import { Button } from '@components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@components/ui/dialog';
import { useModal } from '@context/use-modal';
import { EditIcon, PlusIcon } from 'lucide-react';
import { toast } from 'sonner';
import { validatiodCrudMap, ValidationCrudMap } from '@helpers/validations-map';
import { handleSafeActionError } from '@lib/handle-safe-action-error';

export interface CrudFormProps<T extends Record<string, any>> {
	fieldConfig?: Partial<FieldConfig<NoInfer<T>>>;
	crud: ValidationCrudMap;
}

export const CrudForm = <T extends Record<string, any>>({
	fieldConfig,
	crud,
}: CrudFormProps<T>) => {
	const validations = validatiodCrudMap[crud];
	const { open, isOpen, close, data, clearData } = useModal();
	const confirm = useConfirm();

	const formType = data?.id ? 'update' : 'create';

	return (
		<>
			<section className='flex flex-row-reverse'>
				<Dialog
					open={isOpen}
					onOpenChange={(value) => {
						if (!value) {
							close();
							setTimeout(() => {
								clearData();
							}, 300);
							return;
						}

						open();
					}}
				>
					<DialogTrigger asChild>
						<Button autoFocus>
							<PlusIcon /> Create
						</Button>
					</DialogTrigger>

					<DialogContent>
						<DialogHeader>
							<DialogTitle>{validations[formType].title} Form</DialogTitle>
							<AutoForm
								key={data?.key}
								className='mt-4'
								onSubmit={async (values) => {
									const data = await confirm({
										title: 'Are you sure?',
										actionButton: 'Yes',
										body: 'This action cannot be undone',
										cancelButton: 'No',
									});

									if (!data) {
										return;
									}

									const toastId = toast.loading('Loading...');

									if (!values?.id) {
										try {
											const data = await validations.createAction(values);

											if (handleSafeActionError(toastId, data)) {
												return;
											}

											toast.success('Resource created successfully', {
												id: toastId,
											});

											close();
										} catch (error) {
											toast.error("Couldn't create resource", { id: toastId });
										}

										return;
									}

									try {
										const data = await validations.updateAction(values);

										if (handleSafeActionError(toastId, data)) {
											return;
										}

										toast.success('Resource updated successfully', {
											id: toastId,
										});
									} catch (error) {
										toast.error("Couldn't update resource", { id: toastId });
									}

									close();
								}}
								formSchema={validations[formType].validation as any}
								fieldConfig={{
									id: {
										hidden: true,
									},
									...fieldConfig,
								}}
								defaultValues={data}
							>
								<AutoFormSubmit className='w-full'>
									{formType === 'create' ? (
										<PlusIcon size={18} />
									) : (
										<EditIcon size={18} />
									)}{' '}
									{formType === 'create' ? 'Create' : 'Update'}
								</AutoFormSubmit>
							</AutoForm>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</section>
		</>
	);
};
