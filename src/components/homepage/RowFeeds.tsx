import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { Dispatch, SetStateAction, useState } from 'react';
import { AiFillLike, AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { male } from '../../assets';
import { updatelikeCount } from '../../lib/api/posts/post.api';
import { UserProfileAction } from '../../lib/reducers/userProfileReducer';
import { UserFeeds } from '../../types/user.model';
import Comments from '../Comments';
import Dropdown from '../Dropdown';
import Wrapper from '../Wrapper';
import StyledIcon from '../icons/StyledIcon';
import Modal from '../modals/Modal';
import PostCommentsForm from '../post-form/PostCommentsForm';
import LikeAndComments from './LikeAndComments';
import PostContent from './PostContent';

export interface RowFeedsType {
	postInfo: UserFeeds;
	feeds?: UserFeeds[] | null;
	setFeeds?: Dispatch<SetStateAction<UserFeeds[] | null>>;
	dispatchPubProfile?: Dispatch<UserProfileAction>;
}

const RowFeeds = ({ postInfo, setFeeds, dispatchPubProfile }: RowFeedsType) => {
	const { id, token } = useAppSelector(state => state.user);
	const [contentPost, setContentPost] = useState<JSX.Element | undefined>();
	const [likeStatus, setLikeStatus] = useState(postInfo.likes.includes(id));
	const [likeDisable, setLikeDisable] = useState(false);

	let allowOpts = id === postInfo.author._id;
	let isEdited = postInfo.createdAt === postInfo.updatedAt;

	const handleLikeToggle = async () => {
		setLikeDisable(true);
		const res = await updatelikeCount(token, postInfo._id, likeStatus);
		if (res) {
			// TODO: is it correct updated based on previous state ? or just bring the value
			setLikeStatus(prevLikeValue => !prevLikeValue);
			if (dispatchPubProfile) {
				dispatchPubProfile({
					type: 'TOGGLE_LIKE',
					payload: {
						postId: postInfo._id,
						likeCount: postInfo.likeCount,
						toggleStatus: likeStatus,
						userId: id
					}
				});
			}
			if (setFeeds) {
				setFeeds(prevFeed =>
					(prevFeed || []).map(feed => {
						return feed._id === postInfo._id ? updatePostInfoFeed(feed) : feed;
					})
				);
			}
			setLikeDisable(false);
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
				<img src={male} alt='' className='h-11 w-11 rounded-full' />
				<div className='flex flex-col'>
					<span className='font-semibold'>
						<NavLink to={`/profile/${postInfo.author._id}`}>{postInfo.author.username}</NavLink>
					</span>
					<span className='text-sm italic text-slate-700'>
						{formatDistanceToNowStrict(new Date(postInfo.createdAt))}
						{!isEdited && <span> &#x2027; Edited</span>}
					</span>
				</div>
				{allowOpts && <Dropdown postInfo={postInfo} />}
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
			{allowOpts && <Comments />}
		</div>
	);
};

export default Wrapper(RowFeeds);
