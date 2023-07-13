import { useEffect, useReducer } from 'react';
import { useAppSelector } from '../../app/hooks';
import CreatePost from '../../components/homepage/CreatePost';
import RowFeeds from '../../components/homepage/RowFeeds';
import HeaderProfile from '../../components/userprof/HeaderProfile';
import { userInformation } from '../../lib/api/user/user.api';
import { UserPostsContext } from '../../lib/contexts/userPosts/UserPostsContext';
import userProfileReducer, { INITIAL_PROFILE } from '../../lib/reducers/userProfileReducer';

type Props = {
	token: string;
};

const UserPrivProfile = ({}: Props) => {
	const userPrivate = useAppSelector(state => state.userGlobalInfo);
	const { token, id } = useAppSelector(state => state.user);
	const [privatePost, dispatchPrivatePost] = useReducer(userProfileReducer, INITIAL_PROFILE);

	const callPrivatePosts = async (token: string, idUserParam?: string) => {
		const { result } = await userInformation(token, idUserParam);
		if (result !== null) {
			dispatchPrivatePost({ type: 'SUCCESS_INFO', payload: result });
		}
	};

	useEffect(() => {
		callPrivatePosts(token, id);
	}, []);

	return (
		<UserPostsContext.Provider value={{ dispatchUserProfile: dispatchPrivatePost, token }}>
			<div className='mx-auto flex max-w-3xl flex-col gap-4 p-4'>
				<HeaderProfile userHeader={userPrivate} postCount={privatePost.posts.length} privProfile />
				<CreatePost />
				<div className='flex items-start gap-4'>
					<div className='w-[40%] rounded-lg bg-slate-100 p-4'>
						<div className='text-lg font-semibold'>About</div>
					</div>
					<div className='flex w-[60%] flex-col gap-4'>
						{privatePost.posts.map(post => (
							<RowFeeds key={post._id} postInfo={post} />
						))}
					</div>
				</div>
			</div>
		</UserPostsContext.Provider>
	);
};

export default UserPrivProfile;
