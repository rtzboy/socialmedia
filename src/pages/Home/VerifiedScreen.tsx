import { Outlet } from 'react-router-dom';
import Navbar from '../../components/navigationbar/Navbar';

const VerifiedScreen = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};

export default VerifiedScreen;
