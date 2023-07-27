import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleLikeUserPost } from '../../features/post/user-posts-slice';
import { updatelikeCount } from '../../lib/api/posts/post.api';
import { UserPostsShape } from '../../types/posts.model';
import Wrapper from '../Wrapper';
import Modal from '../modals/Modal';
import PostCommentsForm from '../post-form/PostCommentsForm';
import ButtonLikeComment from '../usercomment/ButtonLikeComment';
import LikeAndComments from './LikeAndComments';
import PostContent from './PostContent';

export interface RowFeedsType {
	postInfo: UserPostsShape;
}

const UserPost = ({ postInfo }: RowFeedsType) => {
	const { id, token } = useAppSelector(state => state.userAuth);
	const [contentPost, setContentPost] = useState<JSX.Element | undefined>();
	const likeStatus = postInfo.likes.includes(id);
	const [likeDisable, setLikeDisable] = useState(false);
	const dispatchApp = useAppDispatch();

	let isEdited = postInfo.createdAt === postInfo.updatedAt;

	const handleLikeToggle = async () => {
		setLikeDisable(true);
		const res = await updatelikeCount(token, postInfo._id, likeStatus);
		if (res) {
			dispatchApp(toggleLikeUserPost({ idPost: postInfo._id, likeState: likeStatus, userId: id }));
			setTimeout(() => {
				setLikeDisable(false);
			}, 400);
		} else {
			toast.error('Something wrong happened!', { duration: 3500 });
			setTimeout(() => {
				setLikeDisable(false);
			}, 400);
		}
	};

	return (
		<div className='flex flex-col gap-2'>
			<Modal>{contentPost}</Modal>
			<div className='relative flex items-center gap-4'>
				<img
					src={postInfo.author.profilePic}
					alt={postInfo.author.username}
					className='h-11 w-11 rounded-full object-cover'
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
			<ButtonLikeComment
				bottonDisable={likeDisable}
				likeStatus={likeStatus}
				toggleLike={() => handleLikeToggle()}
				showContentOnModal={() =>
					setContentPost(
						<PostCommentsForm
							closeModal={() => setContentPost(undefined)}
							idUserPost={postInfo._id}
							renderBy='UserPost'
						/>
					)
				}
			/>
		</div>
	);
};

export default Wrapper(UserPost);
