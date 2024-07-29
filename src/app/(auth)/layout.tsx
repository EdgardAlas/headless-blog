import React from 'react';

const AuthLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<main className='flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900'>
			{children}
		</main>
	);
};

export default AuthLayout;
