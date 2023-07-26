import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import UserPrivProfile from './UserPrivProfile';
import UserPubProfile from './UserPubProfile';

const UserProfile = () => {
	const { id, token } = useAppSelector(state => state.userAuth);
	const { idUserParam } = useParams();

	const ShowProfile = id === idUserParam ? UserPrivProfile : UserPubProfile;

	return <ShowProfile token={token} idUrl={idUserParam} />;
};

export default UserProfile;
