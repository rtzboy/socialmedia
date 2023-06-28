import { FormEvent } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { deletePost } from '../../lib/api/posts/post.api';
import { useUserPostsContext } from '../../lib/contexts/userPosts/UserPostsContext';
import Button from '../form/Button';
import { UserFeeds } from '../homepage/NewFeeds';

type PostDeleteFormProps = {
	closeModal: () => void;
	currentPost: UserFeeds;
};

const PostDeleteForm = ({ closeModal, currentPost }: PostDeleteFormProps) => {
	const { userProfileInfo, setUserProfileInfo, token } = useUserPostsContext();

	const handleDeletePost = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		if (userProfileInfo === null) return;
		const result = await deletePost(token, currentPost._id);
		if (result) {
			const removePost = [...(userProfileInfo?.posts ?? [])].filter(
				({ _id }) => _id !== currentPost._id
			);
			setUserProfileInfo({ ...userProfileInfo, posts: removePost });
		}
		closeModal();
	};

	return (
		<form
			onSubmit={handleDeletePost}
			className='relative flex flex-col gap-4 rounded-lg bg-slate-100 p-4'
		>
			<div className='text-center text-lg font-semibold'>Delete post</div>
			<span
				onClick={closeModal}
				className='absolute right-3 top-3 cursor-pointer rounded-full bg-slate-200 p-1 hover:bg-slate-300'
			>
				<HiXMark size='1.5rem' />
			</span>
			<div>Are you sure you want to delete this post. This action cannot be undone</div>
			<div className='flex justify-end gap-4'>
				<Button onClick={closeModal} className='cursor-pointer hover:bg-slate-300'>
					Cancel
				</Button>
				<Button className='bg-blue-500 font-semibold text-white hover:opacity-80'>Delete</Button>
			</div>
		</form>
	);
};

export default PostDeleteForm;
