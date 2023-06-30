import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { getNewFeeds } from '../../lib/api/posts/post.api';
import { UserFeeds } from '../../types/user.model';
import RowFeeds from './RowFeeds';

const NewFeeds = () => {
	const token = useAppSelector(state => state.user.token);
	const [feeds, setFeeds] = useState<Array<UserFeeds> | null>(null);
	const [message, setMessage] = useState('');

	useEffect(() => {
		const callUserFeeds = async () => {
			const { success, feeds, msg } = await getNewFeeds(token);
			if (success) {
				setFeeds(feeds);
				setMessage('');
			} else {
				setMessage(msg);
			}
		};
		callUserFeeds();
	}, []);

	return (
		<div className='flex flex-col gap-4'>
			{message && <div>{message}</div>}
			{feeds?.map(feed => (
				<RowFeeds key={feed._id} postInfo={feed} />
			))}
		</div>
	);
};

export default NewFeeds;
