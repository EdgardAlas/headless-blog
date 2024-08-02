import { SafeActionResult } from 'next-safe-action';
import { toast } from 'sonner';

export const handleSafeActionError = (
	id: string | number,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	response: SafeActionResult<TODO, any, TODO> | undefined,
	errorMessage?: string
) => {
	if (response?.serverError) {
		toast.error(errorMessage ?? response.serverError, {
			id,
		});

		return true;
	}
	if (response?.validationErrors) {
		const firstId = Object.keys(response?.validationErrors)[0];
		toast.error(
			(
				response?.validationErrors as Record<
					string,
					{
						_errors: string[];
					}
				>
			)?.[firstId]?.['_errors']?.[0] ?? 'An error occurred',
			{
				id,
			}
		);

		return true;
	}

	return false;
};
