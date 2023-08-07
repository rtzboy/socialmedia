import { formatDistanceToNowStrict } from 'date-fns';
import { forwardRef, useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleLikeProfilePost } from '../../features/user/user-profile-slice';
import { updatelikeCount } from '../../lib/api/posts/post.api';
import { UserPostsShape } from '../../types/posts.model';
import Dropdown from '../Dropdown';
import LikeAndComments from '../homepage/LikeAndComments';
import PostContent from '../homepage/PostContent';
import Modal from '../modals/Modal';
import PostCommentsForm from '../post-form/PostCommentsForm';
import ButtonLikeComment from '../usercomment/ButtonLikeComment';

type TProps = {
	userPosts: UserPostsShape;
};

const ProfilePost = forwardRef<HTMLElement, TProps>(({ userPosts }: TProps, ref) => {
	const { id, token } = useAppSelector(state => state.userAuth);
	const [contentPost, setContentPost] = useState<JSX.Element | undefined>();
	const [likeDisable, setLikeDisable] = useState(false);
	const dispatchApp = useAppDispatch();

	let likeStatus = userPosts.likes.includes(id);

	let allowOpts = id === userPosts.author._id;
	let isEdited = userPosts.createdAt === userPosts.updatedAt;

	const handleLikeToggle = async () => {
		setLikeDisable(true);
		const res = await updatelikeCount(token, userPosts._id, likeStatus);
		if (res) {
			dispatchApp(
				toggleLikeProfilePost({ idPost: userPosts._id, likeState: likeStatus, userId: id })
			);
			setTimeout(() => {
				setLikeDisable(false);
			}, 400);
		} else {
			toast.error('Something wrong happened!', { duration: 3500 });
			setTimeout(() => {
				setLikeDisable(false);
			}, 300);
		}
	};

	const profilePost = (
		<div className='flex flex-col gap-2'>
			<Modal>{contentPost}</Modal>
			<div className='relative flex items-center gap-4'>
				<img
					src={userPosts.author.profilePic}
					alt={userPosts.author.username}
					className='h-11 w-11 rounded-full object-cover'
				/>
				<div className='flex flex-col'>
					<span className='font-semibold'>
						<NavLink to={`/profile/${userPosts.author._id}`}>{userPosts.author.username}</NavLink>
					</span>
					<span className='text-sm italic text-slate-700 dark:text-gray-400'>
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
			<ButtonLikeComment
				bottonDisable={likeDisable}
				likeStatus={likeStatus}
				toggleLike={() => handleLikeToggle()}
				showContentOnModal={() =>
					setContentPost(
						<PostCommentsForm
							closeModal={() => setContentPost(undefined)}
							idUserPost={userPosts._id}
							renderBy='ProfilePost'
						/>
					)
				}
			/>
			{/* {allowOpts && <CommentBox idPost={userPosts._id} insertedFrom='ProfilePost' />} */}
		</div>
	);

	const content = ref ? (
		<article ref={ref} className='rounded-lg bg-slate-100 p-4 dark:bg-black-400 dark:text-white'>
			{profilePost}
		</article>
	) : (
		<article className='rounded-lg bg-slate-100 p-4 dark:bg-black-400 dark:text-white'>
			{profilePost}
		</article>
	);

	return content;
});

export default ProfilePost;
