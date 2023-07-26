import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { PrivateRoutes, PublicRoutes } from './constants/routes';
import { createUserHeader } from './features/user/user-header-slice';
import { AuthGuard } from './guards/auth.guard';
import { callUserHeader } from './lib/api/user/user.api';
import HomeScreen from './pages/Home/HomeScreen';
import WelcomeScreen from './pages/Home/WelcomeScreen';
import UserProfile from './pages/Profiles/UserProfile';

const App = () => {
	const { token, id } = useAppSelector(state => state.userAuth);
	const dispatchApp = useAppDispatch();

	const setUserInfoGlobal = async () => {
		const { userHeader, error: err } = await callUserHeader(token, id);
		if (userHeader !== null) {
			dispatchApp(createUserHeader(userHeader));
		} else {
			console.log(err);
		}
	};

	useEffect(() => {
		if (!id) return;
		setUserInfoGlobal();
	}, [id]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Navigate to={PrivateRoutes.Home} />} />
				<Route path={`/${PublicRoutes.Login}`} element={<WelcomeScreen />} />
				<Route path={`/${PublicRoutes.Signup}`} element={<WelcomeScreen />} />
				<Route path='*' element={<div>NotFound</div>} />
				<Route element={<AuthGuard />}>
					<Route path={`/${PrivateRoutes.Home}`} element={<HomeScreen />} />
					<Route path={`/${PrivateRoutes.Profile}/:idUserParam`} element={<UserProfile />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
