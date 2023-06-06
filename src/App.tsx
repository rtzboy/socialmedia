import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { store } from './app/store';
import { PrivateRoutes, PublicRoutes } from './constants/routes';
import { AuthGuard } from './guards/auth.guard';
import Login from './pages/Login/Login';

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Navigate to={PublicRoutes.Login} />} />
					<Route path={`/${PublicRoutes.Login}`} element={<Login />} />
					<Route path='*' element={<div>NotFound</div>} />
					<Route element={<AuthGuard />}>
						<Route path={`/${PrivateRoutes.Home}`} element={<div>Home</div>} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
