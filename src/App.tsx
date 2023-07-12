import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Navbar from './components/Navbar';
import { PrivateRoutes, PublicRoutes } from './constants/routes';
import { createUserInfo } from './features/user/userInfo-slice';
import { AuthGuard } from './guards/auth.guard';
import { userInformation } from './lib/api/user/user.api';
import HomeScreen from './pages/Home/HomeScreen';
import Login from './pages/Login/Login';
import UserProfile from './pages/Profiles/UserProfile';
import Signup from './pages/Signup/Signup';

const App = () => {
	const { token, id } = useAppSelector(state => state.user);
	const { userInfo } = useAppSelector(state => state.userGlobalInfo);
	const dispatchApp = useAppDispatch();

	const settingUserInfoGlobal = async () => {
		const { result } = await userInformation(token, id);
		if (result !== null) {
			dispatchApp(createUserInfo(result));
		}
	};
	useEffect(() => {
		if (userInfo._id) return;
		settingUserInfoGlobal();
	}, []);

	return (
		<BrowserRouter>
			{id && <Navbar />}
			<Routes>
				<Route path='/' element={<Navigate to={PrivateRoutes.Home} />} />
				<Route path={`/${PublicRoutes.Login}`} element={<Login />} />
				<Route path={`/${PublicRoutes.Signup}`} element={<Signup />} />
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
