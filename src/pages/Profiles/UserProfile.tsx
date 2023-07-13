import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import UserPrivProfile from './UserPrivProfile';
import UserPubProfile from './UserPubProfile';

const UserProfile = () => {
	const { id, token } = useAppSelector(state => state.user);
	const { idUserParam } = useParams();
	return id === idUserParam ? (
		<UserPrivProfile token={token} />
	) : (
		<UserPubProfile idUrl={idUserParam} token={token} />
	);
};

export default UserProfile;
