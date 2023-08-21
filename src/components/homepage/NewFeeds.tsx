import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setUserPosts } from '../../features/post/user-posts-slice';
import { getNewFeeds } from '../../lib/api/posts/post.api';
import SkeletonPost from '../skeletons/SkeletonPost';
import UserPost from './UserPost';

const NewFeeds = () => {
	const { following } = useAppSelector(state => state.userHeader);
	const userPosts = useAppSelector(state => state.userPosts);
	const token = useAppSelector(state => state.userAuth.token);
	const dispatchApp = useAppDispatch();

	const callUserFeeds = async () => {
		const { success, feeds } = await getNewFeeds(token);
		if (success) {
			dispatchApp(setUserPosts(feeds));
		} else {
			dispatchApp(setUserPosts(null));
		}
	};

	useEffect(() => {
		callUserFeeds();
	}, []);

	if (userPosts === null) return <SkeletonPost />;
	if (!following.length) return <DivMessages children='Explore, follow friends' />;

	return (
		<div className='flex flex-col gap-4'>
			{!userPosts?.length && <DivMessages children='Nothing To Show...' />}
			{userPosts?.map(post => (
				<UserPost key={post._id} postInfo={post} />
			))}
		</div>
	);
};

export const DivMessages = ({ ...props }) => {
	return (
		<div
			{...props}
			className='rounded-md bg-slate-100 p-4 italic tracking-wide text-slate-700 dark:bg-black-400 dark:text-white'
		/>
	);
};

export default NewFeeds;
