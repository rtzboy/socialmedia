import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import Navbar from './components/Navbar';
import { PrivateRoutes, PublicRoutes } from './constants/routes';
import { AuthGuard } from './guards/auth.guard';
import HomeScreen from './pages/Home/HomeScreen';
import Login from './pages/Login/Login';
import UserProfile from './pages/Profiles/UserProfile';
import Signup from './pages/Signup/Signup';

const App = () => {
	const isAuthenticated = useAppSelector(state => state.user);

	return (
		<BrowserRouter>
			{isAuthenticated.username && <Navbar />}
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
