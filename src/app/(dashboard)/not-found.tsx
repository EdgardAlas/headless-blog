import { Button } from '@components/ui/button';
import Link from 'next/link';

const NotFound = () => {
	return (
		<div className='flex w-full flex-col items-center justify-center gap-4 px-4'>
			<div className='space-y-2 text-center'>
				<h1 className='text-4xl font-bold tracking-tighter'>
					404 - Page Not Found
				</h1>
				<p className='text-gray-500 dark:text-gray-400'>
					The page you are looking for does not exist or has been moved.
				</p>
			</div>
			<Button asChild>
				<Link href='/'>Go back to home</Link>
			</Button>
		</div>
	);
};

export default NotFound;
