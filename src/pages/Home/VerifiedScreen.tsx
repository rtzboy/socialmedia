import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const VerifiedScreen = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};

export default VerifiedScreen;
