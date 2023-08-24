import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { PrivateRoutes, PublicRoutes } from './constants/routes';
import { resetUserAuth } from './features/user/user-auth-slice';
import { createUserHeader, deleteUserHeader } from './features/user/user-header-slice';
import { AuthGuard } from './guards/auth.guard';
import { callUserHeader } from './lib/api/user/user.api';
import useThemeDisplay from './lib/hooks/useDisplayTheme';
import ChatScreen from './pages/Chats/ChatScreen';
import HomeScreen from './pages/Home/HomeScreen';
import WelcomeScreen from './pages/Home/WelcomeScreen';
import PeopleScreen from './pages/People/PeopleScreen';
import UserProfile from './pages/Profiles/UserProfile';

const App = () => {
	const { token, id } = useAppSelector(state => state.userAuth);
	const dispatchApp = useAppDispatch();
	useThemeDisplay();

	const setUserInfoGlobal = async () => {
		const { userHeader, error } = await callUserHeader(token, id);
		if (userHeader) {
			dispatchApp(createUserHeader(userHeader));
		}
		if (error === 'Request is not authorized') {
			dispatchApp(resetUserAuth());
			dispatchApp(deleteUserHeader());
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
					<Route path={`/${PrivateRoutes.People}`} element={<PeopleScreen />} />
					<Route path={`/${PrivateRoutes.Chats}`} element={<ChatScreen />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
