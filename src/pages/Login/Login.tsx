import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineKey, HiOutlineMail } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Button from '../../components/form/Button';
import InputText from '../../components/form/InputText';
import { PrivateRoutes } from '../../constants/routes';
import { createUserAuth } from '../../features/user/user-auth-slice';
import { loginCall } from '../../lib/auth/api-auth';
import useLogSignUp from '../../lib/hooks/useLogSignUp';

export interface LoginType {
	email: string;
	password: string;
}

type LoginTypeProps = {
	setSignStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login = ({ setSignStatus }: LoginTypeProps) => {
	const user = useAppSelector(state => state.userAuth);
	const dispatchApp = useAppDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState<LoginType>({ email: '', password: '' });
	const [isVisible, setIsVisible] = useState(false);
	const { logSignUp, loadingLogSign, errorLogSign, resetLogSign } = useLogSignUp();

	const handleChangeInputs = (evt: ChangeEvent<HTMLInputElement>) =>
		setFormData({ ...formData, [evt.target.name]: evt.target.value });

	const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		loadingLogSign();
		const { success, id, email, error, token } = await loginCall(formData);
		if (!success) {
			errorLogSign(error);
			return;
		}
		dispatchApp(createUserAuth({ id, email, token }));
		navigate(`/${PrivateRoutes.Home}`);
		resetLogSign();
	};

	useEffect(() => {
		if (!user.id) return;
		navigate(`/${PrivateRoutes.Home}`);
	}, []);

	return (
		<form
			onSubmit={handleSubmit}
			className='flex w-full max-w-md flex-col gap-12 bg-white p-8 dark:bg-black-400 dark:text-white md:p-12'
		>
			<h2 className='text-2xl font-semibold'>
				<span className='underline underline-offset-4'>Lo</span>gin
			</h2>
			<div className='relative flex flex-col gap-12'>
				<div className='relative'>
					<span className='absolute left-2 top-1/2 -translate-y-1/2 text-blue-500 dark:text-emerald-300'>
						<HiOutlineMail size='1.4rem' strokeWidth={1.5} />
					</span>
					<InputText
						onChange={handleChangeInputs}
						error={false}
						type='email'
						label='email'
						placeholder='Email'
						className='bg-transparent focus:border-b-blue-500 dark:focus:border-b-emerald-300'
					/>
				</div>
				<div className='relative'>
					<span className='absolute left-2 top-1/2 -translate-y-1/2 text-blue-500 dark:text-emerald-300'>
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
						className='bg-transparent focus:border-b-blue-500 dark:focus:border-b-emerald-300'
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
					className='w-full bg-blue-500 font-semibold text-white disabled:opacity-50 dark:bg-emerald-300 dark:text-black-600'
				>
					Login
				</Button>
				<div className='mt-2 text-center'>
					<span className='text-sm'>
						Dont have an account?{' '}
						<span
							className='cursor-pointer text-blue-500 dark:text-emerald-300'
							onClick={() => setSignStatus(prevState => !prevState)}
						>
							Signup
						</span>
					</span>
				</div>
			</div>
		</form>
	);
};

export default Login;
