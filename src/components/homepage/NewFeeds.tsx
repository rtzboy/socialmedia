import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { getNewFeeds } from '../../lib/api/posts/post.api';
import { UserCommentContext } from '../../lib/contexts/UserCommentContext';
import { UserFeeds } from '../../types/user.model';
import SkeletonPost from '../skeletons/SkeletonPost';
import RowFeeds from './RowFeeds';

const NewFeeds = () => {
	const token = useAppSelector(state => state.user.token);
	const { following } = useAppSelector(state => state.userGlobalInfo);

	const [feeds, setFeeds] = useState<Array<UserFeeds>>();

	const callUserFeeds = async () => {
		const { success, feeds } = await getNewFeeds(token);
		if (success) {
			setFeeds(feeds);
		} else {
			setFeeds(feeds);
		}
	};

	useEffect(() => {
		callUserFeeds();
	}, []);

	if (feeds === undefined) return <SkeletonPost />;
	if (!following.length) return <DivMessages children='Explore, follow friends' />;

	return (
		<div className='flex flex-col gap-4'>
			<UserCommentContext.Provider value={{ setFeeds, feeds }}>
				{!feeds.length && <DivMessages children='Nothing To Show...' />}
				{feeds.map(feed => (
					<RowFeeds key={feed._id} postInfo={feed} feeds={feeds} setFeeds={setFeeds} />
				))}
			</UserCommentContext.Provider>
		</div>
	);
};

export const DivMessages = ({ ...props }) => {
	return (
		<div {...props} className='rounded-md bg-slate-100 p-4 italic tracking-wide text-slate-700' />
	);
};

export default NewFeeds;
