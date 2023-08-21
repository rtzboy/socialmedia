import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Features from '../../components/homepage/Features';
import Navbar from '../../components/navigationbar/Navbar';

const VerifiedScreen = () => {
	return (
		<>
			<Navbar />
			<Features />
			<Outlet />
			<Toaster />
		</>
	);
};

export default VerifiedScreen;
