import { ChangeEvent, useState } from 'react';
import {
	HiOutlineEye,
	HiOutlineEyeOff,
	HiOutlineKey,
	HiOutlineMail,
	HiOutlineUserCircle
} from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import Button from '../../components/form/Button';
import InputText from '../../components/form/InputText';
import { PublicRoutes } from '../../constants/routes';

const Signup = () => {
	const [formSignupData, setFormSignupData] = useState({ username: '', email: '', password: '' });
	const [isVisible, setIsVisible] = useState(false);

	const handleChangeInputs = (evt: ChangeEvent<HTMLInputElement>) => {
		setFormSignupData({ ...formSignupData, [evt.target.name]: evt.target.value });
	};

	return (
		<form className='flex max-w-xs flex-col gap-12 rounded-2xl bg-white p-6'>
			<h2 className='text-2xl font-semibold'>
				<span className='underline underline-offset-4'>Si</span>gnup
			</h2>
			<div className='flex flex-col gap-12'>
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
			</div>
			<div>
				<Button type='submit' className='w-full bg-blue-500 text-white'>
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
