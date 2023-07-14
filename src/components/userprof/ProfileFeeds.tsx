import { formatDistanceToNowStrict } from 'date-fns';
import { Dispatch, useState } from 'react';
import { AiFillLike, AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { updatelikeCount } from '../../lib/api/posts/post.api';
import { UserProfileAction } from '../../lib/reducers/userProfileReducer';
import { UserFeeds } from '../../types/user.model';
import Comments from '../Comments';
import Dropdown from '../Dropdown';
import Wrapper from '../Wrapper';
import LikeAndComments from '../homepage/LikeAndComments';
import PostContent from '../homepage/PostContent';
import StyledIcon from '../icons/StyledIcon';
import Modal from '../modals/Modal';
import PostCommentsForm from '../post-form/PostCommentsForm';

type Props = {
	userPosts: UserFeeds;
	dispatchPost: Dispatch<UserProfileAction>;
};

const ProfileFeeds = ({ userPosts, dispatchPost }: Props) => {
	const { id, token } = useAppSelector(state => state.user);
	const [contentPost, setContentPost] = useState<JSX.Element | undefined>();
	const [likeStatus, setLikeStatus] = useState(userPosts.likes.includes(id));
	const [likeDisable, setLikeDisable] = useState(false);

	let allowOpts = id === userPosts.author._id;
	let isEdited = userPosts.createdAt === userPosts.updatedAt;

	const handleLikeToggle = async () => {
		setLikeDisable(true);
		const res = await updatelikeCount(token, userPosts._id, likeStatus);
		if (res) {
			setLikeStatus(prevLikeValue => !prevLikeValue);
			if (dispatchPost) {
				dispatchPost({
					type: 'TOGGLE_LIKE',
					payload: {
						postId: userPosts._id,
						likeCount: userPosts.likeCount,
						toggleStatus: likeStatus,
						userId: id
					}
				});
			}
			setTimeout(() => {
				setLikeDisable(false);
			}, 300);
		} else {
			// TODO: notification?
			console.log('Error');
		}
	};

	return (
		<div className='flex flex-col gap-2'>
			<Modal>{contentPost}</Modal>
			<div className='relative flex items-center gap-4'>
				<img
					src={userPosts.author.profilePic}
					alt={userPosts.author.username}
					className='h-11 w-11 rounded-full'
				/>
				<div className='flex flex-col'>
					<span className='font-semibold'>
						<NavLink to={`/profile/${userPosts.author._id}`}>{userPosts.author.username}</NavLink>
					</span>
					<span className='text-sm italic text-slate-700'>
						{formatDistanceToNowStrict(new Date(userPosts.createdAt))}
						{!isEdited && <span> &#x2027; Edited</span>}
					</span>
				</div>
				{allowOpts && <Dropdown postInfo={userPosts} />}
			</div>
			<div className='flex items-center whitespace-pre-wrap'>
				<PostContent content={userPosts.content} />
			</div>
			<LikeAndComments
				likeStatus={likeStatus}
				likeCount={userPosts.likeCount}
				commentCount={userPosts.comments.length}
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
								currentPost={userPosts}
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

export default Wrapper(ProfileFeeds);
