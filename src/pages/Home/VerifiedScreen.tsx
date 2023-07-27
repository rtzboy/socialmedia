import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/navigationbar/Navbar';

const VerifiedScreen = () => {
	return (
		<>
			<Navbar />
			<Outlet />
			<Toaster />
		</>
	);
};

export default VerifiedScreen;
