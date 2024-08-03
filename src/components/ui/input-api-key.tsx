'use client';

import { Button } from '@/components/ui/button';
import { Input, InputProps } from '@/components/ui/input';
import { cn } from '@/lib/cn';
import { CopyCheckIcon, RefreshCcw } from 'lucide-react';
import { ChangeEvent, forwardRef, useState } from 'react';
import { toast } from 'sonner';

const InputApiKey = forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		const [copySuccess, setCopySuccess] = useState(false);

		return (
			<div className='relative'>
				<Input
					className={cn('hide-password-toggle pr-10', className)}
					ref={ref}
					{...props}
					readOnly
				/>
				<Button
					type='button'
					variant='ghost'
					size='sm'
					className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
					onClick={async () => {
						if (copySuccess) {
							toast.error('Already copied to clipboard, please wait a moment');
							return;
						}

						const toastId = toast.loading('Generating API Key...');

						const response = await fetch('/api/generate-api-key', {
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
							},
						});

						const data = (await response.json()) as { apiKey: string };

						navigator.clipboard.writeText(data.apiKey);

						props.onChange?.({
							target: {
								value: data.apiKey,
								name: props?.name as string,
							},
						} as ChangeEvent<HTMLInputElement>);

						setCopySuccess(true);

						toast.success('Copied to clipboard', {
							onAutoClose: () => {
								setCopySuccess(false);
							},
							id: toastId,
						});
					}}
				>
					{copySuccess ? (
						<CopyCheckIcon className='h-4 w-4' aria-hidden='true' />
					) : (
						<RefreshCcw className='h-4 w-4' aria-hidden='true' />
					)}
					<span className='sr-only'>
						{copySuccess ? 'Copied!' : 'get API Key'}
					</span>
				</Button>

				{/* hides browsers password toggles */}
				<style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
			</div>
		);
	}
);
InputApiKey.displayName = 'PasswordInput';

export { InputApiKey };
