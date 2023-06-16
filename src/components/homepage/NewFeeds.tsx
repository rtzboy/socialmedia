import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';

import { getNewFeeds } from '../../lib/api/posts/post.api';
import RowFeeds from './RowFeeds';

export interface UserFeeds {
	_id: string;
	content: string;
	author: AuthorInterface;
}

export interface AuthorInterface {
	_id: string;
	username: string;
	createdAt: string;
	updatedAt: string;
}

const NewFeeds = () => {
	const token = useAppSelector(state => state.user.token);
	const [feeds, setFeeds] = useState<Array<UserFeeds> | null>(null);
	const [message, setMessage] = useState('');

	useEffect(() => {
		const callUserFeeds = async () => {
			const { success, feeds, msg } = await getNewFeeds(token);
			if (success) return setFeeds(feeds);
			setMessage(msg);
		};
		callUserFeeds();
	}, []);

	return (
		<div className='flex flex-col gap-4'>
			{message && <div>{message}</div>}
			{feeds?.map(feed => (
				<RowFeeds key={feed._id} {...feed} />
			))}
		</div>
	);
};

export default NewFeeds;
