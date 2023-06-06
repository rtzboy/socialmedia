import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { PublicRoutes } from '../constants/routes';

export const AuthGuard = () => {
	const userState = useAppSelector(state => state.user);
	return userState.token ? <Outlet /> : <Navigate replace to={PublicRoutes.Login} />;
};
