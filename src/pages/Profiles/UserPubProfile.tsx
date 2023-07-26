import { useEffect, useReducer } from 'react';
import { useAppSelector } from '../../app/hooks';
import { DivMessages } from '../../components/homepage/NewFeeds';
import SkeletonPost from '../../components/skeletons/SkeletonPost';
import HeaderProfile from '../../components/userprof/HeaderProfile';
import ProfileFeeds from '../../components/userprof/ProfileFeeds';
import userProfileReducer, { INITIAL_PROFILE } from '../../lib/reducers/userProfileReducer';

type Props = {
	idUrl?: string;
	token: string;
};

const UserPubProfile = ({ idUrl, token }: Props) => {
	const { _id, following } = useAppSelector(state => state.userHeader);
	let followStatus = following.includes(idUrl || _id);

	const [userProfile, dispatchPubProfile] = useReducer(userProfileReducer, INITIAL_PROFILE);

	const callUserProfile = async (token: string, idUserParam?: string) => {
		// const { result, error } = await userInformation(token, idUserParam);
		// if (result !== null) {
		// dispatchPubProfile({ type: 'SUCCESS_INFO', payload: result });
		// } else {
		// TODO: notification message
		// console.log(error);
		// }
	};

	useEffect(() => {
		callUserProfile(token, idUrl);
	}, [idUrl]);

	return (
		<div className='mx-auto flex max-w-3xl flex-col gap-4 p-4'>
			<HeaderProfile
				userHeader={userProfile.userInfo}
				postCount={userProfile.posts.length}
				followStatus={followStatus}
			/>
			<div className='flex items-start gap-4'>
				<div className='w-[40%] rounded-lg bg-slate-100 p-4'>
					<div className='text-lg font-semibold'>About</div>
				</div>
				<div className='flex w-[60%] flex-col gap-4'>
					{!userProfile.userInfo.username ? (
						<SkeletonPost />
					) : !userProfile.posts.length ? (
						<DivMessages children='Nothing to show...!' />
					) : null}
					{userProfile.posts.map(post => (
						<ProfileFeeds key={post._id} userPosts={post} />
					))}
				</div>
			</div>
		</div>
	);
};

export default UserPubProfile;
