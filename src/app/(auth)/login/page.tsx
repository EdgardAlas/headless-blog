import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@components/ui/card';
import { LoginForm } from './_containers/login-form';

const LoginPage = async () => {
	return (
		<Card className='w-full max-w-md'>
			<CardHeader>
				<CardTitle className='text-2xl'>Welcome back</CardTitle>
				<CardDescription>
					Enter your email and password to access your account.
				</CardDescription>
			</CardHeader>
			<LoginForm />
		</Card>
	);
};

export default LoginPage;
