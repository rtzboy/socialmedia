import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { Dispatch, SetStateAction, useState } from 'react';
import { AiFillLike, AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { updatelikeCount } from '../../lib/api/posts/post.api';
import { UserFeeds } from '../../types/user.model';
import Wrapper from '../Wrapper';
import StyledIcon from '../icons/StyledIcon';
import Modal from '../modals/Modal';
import PostCommentsForm from '../post-form/PostCommentsForm';
import LikeAndComments from './LikeAndComments';
import PostContent from './PostContent';

export interface RowFeedsType {
	postInfo: UserFeeds;
	feeds: UserFeeds[] | null;
	setFeeds: Dispatch<SetStateAction<UserFeeds[] | null>>;
}

const RowFeeds = ({ postInfo, setFeeds }: RowFeedsType) => {
	const { id, token } = useAppSelector(state => state.user);
	const [contentPost, setContentPost] = useState<JSX.Element | undefined>();
	const [likeStatus, setLikeStatus] = useState(postInfo.likes.includes(id));
	const [likeDisable, setLikeDisable] = useState(false);

	let isEdited = postInfo.createdAt === postInfo.updatedAt;

	const handleLikeToggle = async () => {
		setLikeDisable(true);
		const res = await updatelikeCount(token, postInfo._id, likeStatus);
		if (res) {
			// TODO: is it correct updated based on previous state ? or just bring the value
			setLikeStatus(prevLikeValue => !prevLikeValue);
			if (setFeeds) {
				setFeeds(prevFeed =>
					(prevFeed || []).map(feed => {
						return feed._id === postInfo._id ? updatePostInfoFeed(feed) : feed;
					})
				);
			}
			setTimeout(() => {
				setLikeDisable(false);
			}, 300);
		} else {
			// TODO: notification?
			console.log('Error');
		}
	};

	const updatePostInfoFeed = (feed: UserFeeds) => {
		let likes = [...feed.likes];
		let likeFilterRemove: Array<String> = [];
		let likeCount = feed.likeCount;
		if (likeStatus) {
			likeFilterRemove = likes.filter(likeIdUser => likeIdUser !== id);
			likeCount--;
		} else {
			likes.push(id);
			likeCount++;
		}
		return {
			...feed,
			likes: likeStatus ? likeFilterRemove : likes,
			likeCount
		};
	};

	return (
		<div className='flex flex-col gap-2'>
			<Modal>{contentPost}</Modal>
			<div className='relative flex items-center gap-4'>
				<img
					src={postInfo.author.profilePic}
					alt={postInfo.author.username}
					className='h-11 w-11 rounded-full'
				/>
				<div className='flex flex-col'>
					<span className='font-semibold'>
						<NavLink to={`/profile/${postInfo.author._id}`}>{postInfo.author.username}</NavLink>
					</span>
					<span className='text-sm italic text-slate-700'>
						{formatDistanceToNowStrict(new Date(postInfo.createdAt))}
						{!isEdited && <span> &#x2027; Edited</span>}
					</span>
				</div>
			</div>
			<div className='flex items-center whitespace-pre-wrap'>
				<PostContent content={postInfo.content} />
			</div>
			<LikeAndComments
				likeStatus={likeStatus}
				likeCount={postInfo.likeCount}
				commentCount={postInfo.comments.length}
			/>
			<div className='flex'>
				<button
					disabled={likeDisable}
					onClick={() => handleLikeToggle()}
					className='flex flex-grow cursor-pointer select-none items-center justify-center gap-1 rounded-lg py-1 text-center transition-all hover:bg-slate-200 active:scale-[.95]'
				>
					{likeStatus ? <StyledIcon icon={AiFillLike} /> : <StyledIcon icon={AiOutlineLike} />}
					<span>Like</span>
				</button>
				<span
					onClick={() =>
						setContentPost(
							<PostCommentsForm
								closeModal={() => setContentPost(undefined)}
								currentPost={postInfo}
								likeStatus={likeStatus}
							/>
						)
					}
					className='flex flex-grow cursor-pointer items-center justify-center gap-1 rounded-lg py-1 text-center transition-all hover:bg-slate-200'
				>
					<StyledIcon icon={AiOutlineComment} />
					<span>Comment</span>
				</span>
			</div>
		</div>
	);
};

export default Wrapper(RowFeeds);
