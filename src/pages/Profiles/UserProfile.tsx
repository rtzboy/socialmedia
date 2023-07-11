import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { landscapeTest, male } from '../../assets';
import Button from '../../components/form/Button';
import CreatePost from '../../components/homepage/CreatePost';
import RowFeeds from '../../components/homepage/RowFeeds';
import { userInformation } from '../../lib/api/user/user.api';
import { UserPostsContext } from '../../lib/contexts/userPosts/UserPostsContext';
import userProfileReducer, { INITIAL_PROFILE } from '../../lib/reducers/userProfileReducer';

const UserProfile = () => {
	const { token } = useAppSelector(state => state.user);
	const { userInfo } = useAppSelector(state => state.userGlobalInfo);

	const [userProfile, dispatchUserProfile] = useReducer(userProfileReducer, INITIAL_PROFILE);

	const { idUserParam } = useParams();

	const allowCreatePost = userInfo._id === idUserParam;
	let allowUserStuff = userInfo._id === idUserParam;
	let allowFollow = userInfo.following.includes(idUserParam || userInfo._id);

	const callUserProfile = async (token: string, idUserParam?: string) => {
		const { result, error } = await userInformation(token, idUserParam);
		if (result !== null) {
			dispatchUserProfile({ type: 'SUCCESS_INFO', payload: result });
		} else {
			// TODO: notification message
			console.log(error);
		}
	};

	useEffect(() => {
		callUserProfile(token, idUserParam);
	}, [idUserParam]);

	return (
		<div className='mx-auto flex max-w-2xl flex-col gap-4 p-4'>
			<div className='relative overflow-hidden rounded-lg bg-slate-100'>
				<div
					style={{
						backgroundImage: `url("${landscapeTest}")`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover'
					}}
					className='absolute h-44 w-full'
				/>
				<div className='relative mt-8 rounded-lg p-4'>
					<div className='flex justify-center'>
						<img src={male} alt='' className='h-[150px] w-[150px] rounded-full' />
					</div>
					<div className='py-2 text-center text-2xl font-semibold'>
						{userProfile.userInfo.username}
					</div>
					<div className='relative flex w-full justify-between'>
						<div>
							<ul className='flex gap-4 text-sm'>
								<li className='flex flex-col items-center justify-center'>
									<div>Followers</div>
									<div>{userProfile.userInfo.followers.length}</div>
								</li>
								<li className='flex flex-col items-center justify-center'>
									<div>Following</div>
									<div>{userProfile.userInfo.following.length}</div>
								</li>
								<li className='flex flex-col items-center justify-center'>
									<div>Posts</div>
									<div>{userProfile.posts.length}</div>
								</li>
							</ul>
						</div>
						<div>
							{allowUserStuff || (
								<Button className='bg-blue-500 text-white'>
									{allowFollow ? 'Unfollow' : 'Follow'}
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
			<UserPostsContext.Provider value={{ dispatchUserProfile, token }}>
				{allowCreatePost && <CreatePost />}
				<div className='flex items-start gap-4'>
					<div className='w-[30%] rounded-lg bg-slate-100 p-4'>
						<div className='text-lg font-semibold'>About</div>
					</div>
					<div className='flex w-[70%] flex-col gap-4'>
						{allowCreatePost && !userProfile.posts.length ? (
							<div className='rounded-lg bg-slate-100 p-4 text-center italic'>Post Something!</div>
						) : null}
						{allowCreatePost ? null : !userProfile.posts.length ? (
							<div className='rounded-lg bg-slate-100 p-4 text-center italic'>Nothing to show</div>
						) : null}
						{userProfile.posts.map(post => (
							<RowFeeds key={post._id} postInfo={post} dispatchUserProfile={dispatchUserProfile} />
						))}
					</div>
				</div>
			</UserPostsContext.Provider>
		</div>
	);
};

export default UserProfile;
