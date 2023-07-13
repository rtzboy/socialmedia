import { useEffect, useReducer } from 'react';
import { useAppSelector } from '../../app/hooks';
import HeaderProfile from '../../components/userprof/HeaderProfile';
import ProfileFeeds from '../../components/userprof/ProfileFeeds';
import { userInformation } from '../../lib/api/user/user.api';
import userProfileReducer, { INITIAL_PROFILE } from '../../lib/reducers/userProfileReducer';

type Props = {
	idUrl?: string;
	token: string;
};

const UserPubProfile = ({ idUrl, token }: Props) => {
	const { _id, following } = useAppSelector(state => state.userGlobalInfo);
	let followStatus = following.includes(idUrl || _id);

	const [userProfile, dispatchPubProfile] = useReducer(userProfileReducer, INITIAL_PROFILE);

	const callUserProfile = async (token: string, idUserParam?: string) => {
		const { result, error } = await userInformation(token, idUserParam);
		if (result !== null) {
			dispatchPubProfile({ type: 'SUCCESS_INFO', payload: result });
		} else {
			// TODO: notification message
			console.log(error);
		}
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
				<div className='w-[30%] rounded-lg bg-slate-100 p-4'>
					<div className='text-lg font-semibold'>About</div>
				</div>
				<div className='flex w-[70%] flex-col gap-4'>
					{!userProfile.posts.length ? (
						<div className='rounded-lg bg-slate-100 p-4 text-center italic'>Post Something!</div>
					) : null}
					{!userProfile.posts.length ? (
						<div className='rounded-lg bg-slate-100 p-4 text-center italic'>Nothing to show</div>
					) : null}
					{userProfile.posts.map(post => (
						<ProfileFeeds key={post._id} userPosts={post} dispatchPost={dispatchPubProfile} />
					))}
				</div>
			</div>
		</div>
	);
};

export default UserPubProfile;
