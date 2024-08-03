import { getApiKeyAction } from '@/crud/api-key/actions';
import { useAlert } from '@components/ui/alert-dialog-provider';
import { Button } from '@components/ui/button';
import { handleSafeActionError } from '@lib/handle-safe-action-error';
import { Copy, EyeIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface ShowApiKeyProps {
	apiKey: string;
}

export const ShowApiKey = ({ apiKey }: ShowApiKeyProps) => {
	const alert = useAlert();
	return (
		<div>
			<Button
				onClick={async () => {
					const id = toast.loading('Loading ApiKey...');
					const data = await getApiKeyAction({
						apiKeyId: apiKey,
					});

					if (handleSafeActionError(id, data)) {
						return;
					}

					toast.success('ApiKey loaded successfully', {
						id,
					});

					await alert({
						title: 'ApiKey',
						body: (
							<div className='grid gap-4'>
								<p className='font-bold'>
									Api key for{' '}
									<span className='text-green-500'>{data?.data?.name}</span>
								</p>
								<div className='grid gap-2'>
									<p className='break font-bold'>Api Key:</p>
									<span
										className='font-bold text-blue-500'
										style={{
											wordBreak: 'break-word',
										}}
									>
										{data?.data?.apiKey}
									</span>
								</div>
								<Button
									onClick={() => {
										navigator.clipboard.writeText(data?.data?.apiKey || '');
										toast.success('Copied to clipboard');
									}}
								>
									<Copy />
								</Button>
							</div>
						),
					});
				}}
			>
				<EyeIcon />
			</Button>
		</div>
	);
};
