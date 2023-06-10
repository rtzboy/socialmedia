import { ChangeEvent, FormEvent, useState } from 'react';
import {
	HiOutlineEye,
	HiOutlineEyeOff,
	HiOutlineKey,
	HiOutlineMail,
	HiOutlineUserCircle
} from 'react-icons/hi';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import Button from '../../components/form/Button';
import InputText from '../../components/form/InputText';
import { PrivateRoutes, PublicRoutes } from '../../constants/routes';
import { createUser } from '../../features/user/user-slice';
import { signupCall } from '../../lib/auth/api-auth';
import useLogSignUp from '../../lib/hooks/useLogSignUp';

export interface SignupType {
	username: string;
	email: string;
	password: string;
}

const Signup = () => {
	const navigate = useNavigate();
	const dispatchUserAuth = useAppDispatch();

	const { logSignUp, loadingLogSign, errorLogSign, resetLogSign } = useLogSignUp();
	const [formSignupData, setFormSignupData] = useState({ username: '', email: '', password: '' });
	const [isVisible, setIsVisible] = useState(false);

	const handleChangeInputs = (evt: ChangeEvent<HTMLInputElement>) =>
		setFormSignupData({ ...formSignupData, [evt.target.name]: evt.target.value });

	const handleSignupSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		loadingLogSign();

		const csignUp = async () => {
			const { success, email, error, token, username } = await signupCall(formSignupData);
			if (!success) {
				errorLogSign(error);
				return;
			}
			dispatchUserAuth(createUser({ username, email, token }));
			resetLogSign();
			navigate(`/${PrivateRoutes.Home}`);
		};
		csignUp();
	};

	return (
		<form
			onSubmit={handleSignupSubmit}
			className='flex max-w-xs flex-col gap-12 rounded-2xl bg-white p-6'
		>
			<h2 className='text-2xl font-semibold'>
				<span className='underline underline-offset-4'>Si</span>gnup
			</h2>
			<div className='relative flex flex-col gap-12'>
				<div className='relative'>
					<span className='absolute left-2 top-1/2 -translate-y-1/2'>
						<HiOutlineUserCircle size='1.4rem' strokeWidth={1.5} />
					</span>
					<InputText
						onChange={handleChangeInputs}
						error={false}
						type='text'
						label='username'
						placeholder='Username'
						className='focus:border-b-blue-500'
					/>
				</div>
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
				{logSignUp.error && (
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
					Signup
				</Button>
				<div className='mt-2 text-center'>
					<span className='text-sm'>
						Already have an account?{' '}
						<NavLink to={`/${PublicRoutes.Login}`} className='text-blue-500'>
							Login
						</NavLink>
					</span>
				</div>
			</div>
		</form>
	);
};
export default Signup;
