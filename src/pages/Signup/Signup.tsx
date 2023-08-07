import { ChangeEvent, FormEvent, useState } from 'react';
import {
	HiOutlineEye,
	HiOutlineEyeOff,
	HiOutlineKey,
	HiOutlineMail,
	HiOutlineUserCircle
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import Button from '../../components/form/Button';
import InputRadioBtn from '../../components/form/InputRadioBtn';
import InputText from '../../components/form/InputText';
import StyledIcon from '../../components/icons/StyledIcon';
import { PrivateRoutes } from '../../constants/routes';
import { createUserAuth } from '../../features/user/user-auth-slice';
import { signupCall } from '../../lib/auth/api-auth';
import useLogSignUp from '../../lib/hooks/useLogSignUp';

export interface SignupType {
	username: string;
	email: string;
	password: string;
}

type SignupProps = {
	setSignStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const Signup = ({ setSignStatus }: SignupProps) => {
	const navigate = useNavigate();
	const dispatchApp = useAppDispatch();

	const { logSignUp, loadingLogSign, errorLogSign, resetLogSign } = useLogSignUp();
	const [formSignupData, setFormSignupData] = useState({
		username: '',
		email: '',
		password: '',
		gender: ''
	});
	const [isVisible, setIsVisible] = useState(false);
	const [gender, setGender] = useState('');

	const handleChangeInputs = (evt: ChangeEvent<HTMLInputElement>) =>
		setFormSignupData({ ...formSignupData, [evt.target.name]: evt.target.value });

	const handleSignupSubmit = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		loadingLogSign();
		const { success, id, email, error, token } = await signupCall(formSignupData);
		if (!success) {
			errorLogSign(error);
			return;
		}
		dispatchApp(createUserAuth({ id, email, token }));
		navigate(`/${PrivateRoutes.Home}`);
		resetLogSign();
	};

	return (
		<form
			onSubmit={handleSignupSubmit}
			className='flex w-full max-w-md flex-col gap-8 bg-white p-8 dark:bg-black-400 dark:text-white md:p-12'
		>
			<h2 className='text-2xl font-semibold'>
				<span className='underline underline-offset-4'>Si</span>gnup
			</h2>
			<div className='relative flex flex-col gap-8'>
				<div className='relative'>
					<span className='absolute left-2 top-1/2 -translate-y-1/2 text-blue-500 dark:text-emerald-300'>
						<HiOutlineUserCircle size='1.4rem' strokeWidth={1.5} />
					</span>
					<InputText
						onChange={handleChangeInputs}
						error={false}
						type='text'
						label='username'
						placeholder='Username'
						className='bg-transparent focus:border-b-blue-500 dark:focus:border-b-emerald-300'
					/>
				</div>
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
					<StyledIcon
						icon={HiOutlineKey}
						size='1.4rem'
						className='absolute left-2 top-1/2 -translate-y-1/2 text-blue-500 dark:text-emerald-300'
						stroke='stroke-[1.5]'
					/>
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
				<div>
					<div className='relative flex justify-between pt-2'>
						<span className='text-black absolute -top-4 text-[15px] font-semibold'>Gender</span>
						<InputRadioBtn
							onChange={evt => {
								setGender(evt.target.value);
								handleChangeInputs(evt);
							}}
							idRBtn='Male'
							className='rounded-md border-b-2 border-gray-300 p-1'
						/>
						<InputRadioBtn
							onChange={evt => {
								setGender(evt.target.value);
								handleChangeInputs(evt);
							}}
							idRBtn='Female'
							className='rounded-md border-b-2 border-gray-300 px-1'
						/>
						<InputRadioBtn
							onChange={evt => {
								setGender(evt.target.value);
								setFormSignupData({ ...formSignupData, gender: '' });
							}}
							idRBtn='Custom'
							className='rounded-md border-b-2 border-gray-300 px-1'
						/>
					</div>
					{gender === 'Custom' && (
						<div className='relative mt-4'>
							<input
								onChange={handleChangeInputs}
								type='text'
								name='custom-gender'
								placeholder='Gender'
								className='w-full border-b-2 border-b-gray-300 bg-transparent px-2 py-1 outline-none transition-all focus:border-b-blue-500 dark:focus:border-b-emerald-300'
							/>
						</div>
					)}
				</div>
				{logSignUp.error && (
					<span className='absolute -bottom-6 text-sm font-semibold italic text-red-500'>
						{logSignUp.error}
					</span>
				)}
			</div>
			<div>
				<Button
					disabled={logSignUp.loading}
					type='submit'
					className='w-full bg-blue-500 text-white disabled:opacity-50 dark:bg-emerald-300 dark:text-black-600'
				>
					Signup
				</Button>
				<div className='mt-2 text-center'>
					<span className='text-sm'>
						Already have an account?{' '}
						<span
							className='cursor-pointer text-blue-500 dark:text-emerald-300'
							onClick={() => setSignStatus(prevState => !prevState)}
						>
							Login
						</span>
					</span>
				</div>
			</div>
		</form>
	);
};
export default Signup;
