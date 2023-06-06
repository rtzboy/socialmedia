import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { PrivateRoutes } from '../../constants/routes';

const Login = () => {
	const navigate = useNavigate();
	const user = useAppSelector(state => state.user);

	useEffect(() => {
		if (user.token) navigate(`/${PrivateRoutes.Home}`);
	}, []);

	return (
		<form>
			<div>
				<label htmlFor='email'>Email</label>
				<input type='text' name='email' id='email' className='outline-none border' />
			</div>
			<div>
				<label htmlFor='password'>Password</label>
				<input type='password' name='password' id='password' className='outline-none border' />
			</div>
			<div>
				<button type='submit'>Login</button>
			</div>
		</form>
	);
};
export default Login;
