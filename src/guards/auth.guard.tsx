import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { PublicRoutes } from '../constants/routes';
import VerifiedScreen from '../pages/Home/VerifiedScreen';

export const AuthGuard = () => {
	const userState = useAppSelector(state => state.userAuth);
	return userState.token ? <VerifiedScreen /> : <Navigate replace to={PublicRoutes.Login} />;
};
