import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineKey, HiOutlineMail } from 'react-icons/hi';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Button from '../../components/form/Button';
import InputText from '../../components/form/InputText';
import { PrivateRoutes, PublicRoutes } from '../../constants/routes';
import { createUser } from '../../features/user/user-slice';
import { loginCall } from '../../lib/auth/api-auth';
import useLogSignUp from '../../lib/hooks/useLogSignUp';

export interface LoginType {
	email: string;
	password: string;
}

const Login = () => {
	const navigate = useNavigate();
	const user = useAppSelector(state => state.user);
	const dispatchUserAuth = useAppDispatch();

	const [formData, setFormData] = useState<LoginType>({ email: '', password: '' });
	const [isVisible, setIsVisible] = useState(false);
	const { logSignUp, loadingLogSign, errorLogSign, resetLogSign } = useLogSignUp();

	const handleChangeInputs = (evt: ChangeEvent<HTMLInputElement>) =>
		setFormData({ ...formData, [evt.target.name]: evt.target.value });

	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		loadingLogSign();

		const loginUp = async () => {
			const { success, email, error, token, username } = await loginCall(formData);
			if (!success) {
				errorLogSign(error);
				return;
			}
			dispatchUserAuth(createUser({ username, email, token }));
			resetLogSign();
			navigate(`/${PrivateRoutes.Home}`);
		};
		loginUp();
	};

	useEffect(() => {
		if (user.token) navigate(`/${PrivateRoutes.Home}`);
	}, []);

	return (
		<form
			onSubmit={handleSubmit}
			className='flex max-w-xs flex-col gap-12 rounded-2xl bg-white p-6'
		>
			<h2 className='text-2xl font-semibold'>
				<span className='underline underline-offset-4'>Lo</span>gin
			</h2>
			<div className='relative flex flex-col gap-12'>
				<div className='relative'>
					<span className='absolute left-2 top-1/2 -translate-y-1/2'>
						<HiOutlineMail size='1.4rem' strokeWidth={1.5} />
					</span>
					<InputText
						onChange={handleChangeInputs}
						error={false}
						type='email'
						label='email'
						placeholder='Email'
						className='focus:border-b-blue-500'
					/>
				</div>
				<div className='relative'>
					<span className='absolute left-2 top-1/2 -translate-y-1/2'>
						<HiOutlineKey size='1.4rem' strokeWidth={1.5} />
					</span>
					<span
						onClick={() => setIsVisible(!isVisible)}
						className='absolute right-2 top-1/2 -translate-y-1/2 select-none'
					>
						{isVisible ? (
							<HiOutlineEyeOff size='1.4rem' strokeWidth={1.5} />
						) : (
							<HiOutlineEye size='1.4rem' strokeWidth={1.5} />
						)}
					</span>
					<InputText
						onChange={handleChangeInputs}
						error={false}
						type={isVisible ? 'text' : 'password'}
						label='password'
						placeholder='Password'
						className='focus:border-b-blue-500'
					/>
				</div>
				{!!logSignUp.error && (
					<span className='absolute -bottom-5 text-sm font-semibold italic text-red-500'>
						{logSignUp.error}
					</span>
				)}
			</div>
			<div>
				<Button
					disabled={logSignUp.loading}
					type='submit'
					className='w-full bg-blue-500 text-white disabled:opacity-50'
				>
					Login
				</Button>
				<div className='mt-2 text-center'>
					<span className='text-sm'>
						Dont have an account?{' '}
						<NavLink to={`/${PublicRoutes.Signup}`} className='text-blue-500'>
							Signup
						</NavLink>
					</span>
				</div>
			</div>
		</form>
	);
};

export default Login;
