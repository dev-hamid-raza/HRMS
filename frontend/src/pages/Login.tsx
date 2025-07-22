import Loader from '@/common/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import usePostFn from '@/hooks/usePostFn';
import { login } from '@/services/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { postData, loading } = usePostFn(login);
	const [errors, setErrors] = useState({
		usernameError: false,
		passwordError: false,
	});
    const navigate = useNavigate()
	const { setIsAuthenticated, setUser } = useAuth();

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (username === '' || username === undefined) {
			setErrors((pervs) => ({ ...pervs, usernameError: true }));
			toast.error('Username is required');
			return;
		}
		if (password === '' || password === undefined) {
			setErrors((pervs) => ({ ...pervs, passwordError: true }));
			toast.error('Password is required');
			return;
		}
		try {
			const res = await postData({ password, username });
			const user = res.data;
			setUser(user);
			toast.success('Login successfully')
            navigate('dashboard')
			setIsAuthenticated(true);
		} catch (error) {
			const message = error as string;
			if (message.includes('username'))
				setErrors((pervs) => ({ ...pervs, usernameError: true }));
			if (message.includes('password'))
				setErrors((pervs) => ({ ...pervs, passwordError: true }));
			toast.error(message);
		}
	};
	return (
		<div className='bg-surface-100 h-screen flex justify-center items-center'>
			<div className='w-[400px] bg-surface-50 shadow px-3 py-7 rounded-md'>
				<h1 className='heading-primary-lg-semibold mb-7'>Login</h1>
				<form>
					<div className='space-y-3.5'>
						<Input
							label='Username'
							placeholder='Enter your username'
							value={username}
							onChange={(e) => {
								setErrors((pervs) => ({ ...pervs, usernameError: false }));
								setUsername(e.target.value);
							}}
							hasError={errors.usernameError}
						/>
						<Input
							label='Password'
							type='password'
							placeholder='Enter your password'
							value={password}
							onChange={(e) => {
								setErrors((pervs) => ({ ...pervs, passwordError: false }));
								setPassword(e.target.value);
							}}
							hasError={errors.passwordError}
						/>
						<Button onClick={handleSubmit} className='w-full'>
							{loading ? <Loader /> : 'Login'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
