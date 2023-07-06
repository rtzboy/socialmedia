import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { Dispatch, SetStateAction, useState } from 'react';
import { AiFillLike, AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { male } from '../../assets';
import { updatelikeCount } from '../../lib/api/posts/post.api';
import { UserProfileAction } from '../../lib/reducers/userProfileReducer';
import { UserFeeds } from '../../types/user.model';
import Dropdown from '../Dropdown';
import LikeCount from '../LikeCount';
import Wrapper from '../Wrapper';
import StyledIcon from '../icons/StyledIcon';

export interface RowFeedsType {
	postInfo: UserFeeds;
	feeds?: UserFeeds[] | null;
	setFeeds?: Dispatch<SetStateAction<UserFeeds[] | null>>;
	dispatchUserProfile?: Dispatch<UserProfileAction>;
}

const RowFeeds = ({ postInfo, feeds, setFeeds, dispatchUserProfile }: RowFeedsType) => {
	const { id, token } = useAppSelector(state => state.user);
	const [likeStatus, setLikeStatus] = useState(postInfo.likes.includes(id));

	let allowOpts = id === postInfo.author._id;
	let isEdited = postInfo.createdAt === postInfo.updatedAt;

	const handleLikeToggle = async () => {
		const res = await updatelikeCount(token, postInfo._id, likeStatus);
		if (res) {
			setLikeStatus(!likeStatus);
			if (dispatchUserProfile)
				return dispatchUserProfile({
					type: 'TOGGLE_LIKE',
					payload: {
						postId: postInfo._id,
						likeCount: postInfo.likeCount,
						toggleStatus: likeStatus,
						userId: id
					}
				});
			if (!setFeeds) return;
			setFeeds(updatePostToggleLike(feeds, postInfo, likeStatus, id));
		} else {
			// TODO: popup notification error
			console.log(' - error like post');
		}
	};

	return (
		<div className='flex flex-col gap-4'>
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
			<div>{postInfo.content}</div>
			{!!postInfo.likeCount && (
				<div className='relative flex select-none items-center gap-1'>
					<StyledIcon icon={AiFillLike} size='1rem' className='text-blue-500' />
					<LikeCount count={postInfo.likeCount} likeStatus={likeStatus} />
				</div>
			)}
			<hr />
			<div className='flex'>
				<span
					onClick={() => handleLikeToggle()}
					className='flex flex-grow cursor-pointer items-center justify-center gap-1 rounded-lg py-1 text-center transition-all hover:bg-slate-200 active:scale-90'
				>
					{likeStatus ? <StyledIcon icon={AiFillLike} /> : <StyledIcon icon={AiOutlineLike} />}
					<span>Like</span>
				</span>
				<span className='flex flex-grow cursor-pointer items-center justify-center gap-1 rounded-lg py-1 text-center transition-all hover:bg-slate-200'>
					<StyledIcon icon={AiOutlineComment} />
					<span>Comment</span>
				</span>
			</div>
		</div>
	);
};

const updatePostToggleLike = (
	feeds: UserFeeds[] | null | undefined,
	postInfo: UserFeeds,
	likeStatus: boolean,
	userId: string
) =>
	[...(feeds || [])].map(feed => {
		if (feed._id === postInfo._id) {
			let likeCount = likeStatus ? --postInfo.likeCount : ++postInfo.likeCount;
			let likes = [...postInfo.likes];
			if (likeStatus) {
				likes = likes.filter(elm => elm !== userId);
			} else {
				likes.push(userId);
			}
			return {
				...postInfo,
				likeCount,
				likes
			};
		}
		return feed;
	});

export default Wrapper(RowFeeds);
