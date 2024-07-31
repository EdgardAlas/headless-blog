'use client';

import { useConfirm } from '@components/ui/alert-dialog-provider';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { useModal } from '@context/use-modal';
import { validatiodCrudMap, ValidationCrudMap } from '@/crud/validations-map';
import { handleSafeActionError } from '@lib/handle-safe-action-error';
import { Edit2Icon, EllipsisVertical, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

interface CrudActionsProps {
	id: string;
	canBeDeleted: boolean;
	children?: React.ReactNode;

	noEdit?: boolean;
	noDelete?: boolean;
	crud: ValidationCrudMap;
}

export const CrudActions = ({
	children,
	canBeDeleted,
	id,
	noDelete = false,
	noEdit = false,
	crud,
}: CrudActionsProps) => {
	const modal = useModal();
	const confirm = useConfirm();

	const validations = validatiodCrudMap[crud];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<EllipsisVertical />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{!noEdit && (
					<DropdownMenuItem
						onClick={async () => {
							const toastId = toast.loading('Loading...');

							const data = await validations.getAction({
								id,
							});

							if (handleSafeActionError(toastId, data)) {
								return;
							}

							toast.dismiss(toastId);

							modal.open(data?.data);
						}}
					>
						<span className='separate-inline'>
							<Edit2Icon size={18} /> Edit
						</span>
					</DropdownMenuItem>
				)}

				{!noDelete && canBeDeleted && (
					<DropdownMenuItem
						onClick={async () => {
							const confirmation = await confirm({
								title: 'Are you sure?',
								actionButton: 'Yes',
								body: 'This action cannot be undone',
								cancelButton: 'No',
							});

							if (!confirmation) {
								return;
							}

							const toastId = toast.loading('Loading...');
							const data = await validations.deleteAction({ id });

							if (data?.serverError) {
								return toast.error(data?.serverError, { id: toastId });
							}

							toast.success('Resource deleted successfully', {
								id: toastId,
							});
						}}
					>
						<span className='separate-inline'>
							<Trash2Icon size={18} /> Delete
						</span>
					</DropdownMenuItem>
				)}

				{children}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
