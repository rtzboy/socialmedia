import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/navigationbar/Navbar';
import FollowingList from './FollowingUsers/FollowingList';

const VerifiedScreen = () => {
	return (
		<>
			<Navbar />
			<Outlet />
			<FollowingList />
			<Toaster />
		</>
	);
};

export default VerifiedScreen;
