import { formatDistanceToNowStrict } from 'date-fns';
import { useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleLikeUserPost } from '../../features/post/user-posts-slice';
import { updatelikeCount } from '../../lib/api/posts/post.api';
import LikeAndComments from '../homepage/LikeAndComments';
import PostContent from '../homepage/PostContent';
import StyledIcon from '../icons/StyledIcon';
import ButtonLikeComment from '../usercomment/ButtonLikeComment';
import CommentBox from '../usercomment/CommentBox';
import UserComment from '../usercomment/UserComment';

type CommentsForm = {
	closeModal: () => void;
	idUserPost: string;
};

const PostCommentsForm = ({ closeModal, idUserPost }: CommentsForm) => {
	// TODO: only works by calling on "UserPost"
	const { id, token } = useAppSelector(state => state.user);
	const userPost = useAppSelector(state => state.userPosts);
	const [likeDisable, setLikeDisable] = useState(false);
	const dispatchApp = useAppDispatch();

	if (userPost === null) return;
	let indexPost = userPost.findIndex(({ _id }) => _id === idUserPost);
	const currentUserPost = userPost[indexPost || 0];
	let likeState = currentUserPost.likes.includes(id);

	const handleLikeToggle = async () => {
		setLikeDisable(true);
		const res = await updatelikeCount(token, idUserPost, likeState);
		if (res) {
			dispatchApp(toggleLikeUserPost({ idPost: idUserPost, likeState, userId: id }));
			setTimeout(() => {
				setLikeDisable(false);
			}, 500);
		} else {
			// TODO: notification?
			console.log('Error');
		}
	};

	return (
		<div className='relative flex h-[90vh] flex-col gap-2 rounded-lg bg-slate-100 p-4'>
			<StyledIcon
				icon={HiXMark}
				onClick={closeModal}
				size='1.5rem'
				className='absolute right-3 top-3 cursor-pointer rounded-full bg-slate-200 p-1 hover:bg-slate-300'
			/>
			<div className='text-center text-lg font-semibold'>{`${currentUserPost.author.username}'s Post`}</div>
			<div className='relative flex items-center gap-4'>
				<img
					src={currentUserPost.author.profilePic}
					alt={currentUserPost.author.username}
					className='h-11 w-11 rounded-full object-cover'
				/>
				<div className='flex flex-col'>
					<span className='font-semibold'>
						<span>{currentUserPost.author.username}</span>
					</span>
					<span className='text-sm italic text-slate-700'>
						{formatDistanceToNowStrict(new Date(currentUserPost.createdAt))}
					</span>
				</div>
			</div>
			<div className='flex items-center'>
				<PostContent content={currentUserPost.content} />
			</div>
			<LikeAndComments
				likeStatus={likeState}
				likeCount={currentUserPost.likeCount}
				commentCount={currentUserPost.comments.length}
			/>
			<ButtonLikeComment
				likeStatus={likeState}
				bottonDisable={likeDisable}
				toggleLike={() => handleLikeToggle()}
			/>
			<hr />
			<div className='invisible h-full overflow-auto transition-all hover:visible focus:visible'>
				<div className='visible relative flex flex-col gap-2'>
					{currentUserPost.comments.map(comment => (
						<UserComment key={comment._id} {...comment} />
					))}
				</div>
			</div>
			<div className='w-full bg-slate-100'>
				<CommentBox maxHeight='max-h-[350px]' idPost={idUserPost} />
			</div>
		</div>
	);
};

export default PostCommentsForm;
