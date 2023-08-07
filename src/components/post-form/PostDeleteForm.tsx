import { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { HiXMark } from 'react-icons/hi2';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteProfPost } from '../../features/user/user-profile-slice';
import { deletePost } from '../../lib/api/posts/post.api';
import { UserPostsShape } from '../../types/posts.model';
import Button from '../form/Button';
import StyledIcon from '../icons/StyledIcon';

type PostDeleteFormProps = {
	closeModal: () => void;
	currentPost: UserPostsShape;
};

const PostDeleteForm = ({ closeModal, currentPost }: PostDeleteFormProps) => {
	const { token } = useAppSelector(state => state.userAuth);
	const dispatchApp = useAppDispatch();

	const handleDeletePost = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		const result = await deletePost(token, currentPost._id);
		if (result) {
			dispatchApp(deleteProfPost(currentPost._id));
			toast.success('Successfully removed!', { duration: 3500 });
		} else {
			toast.error("Couldn't remove!", { duration: 3500 });
		}
		closeModal();
	};

	return (
		<form
			onSubmit={handleDeletePost}
			className='relative flex flex-col gap-4 rounded-lg bg-slate-100 p-4 dark:bg-black-400 dark:text-white'
		>
			<div className='text-center text-lg font-semibold'>Delete post</div>
			<StyledIcon
				icon={HiXMark}
				onClick={closeModal}
				size='1.5rem'
				className='icons-opt absolute right-3 top-3 cursor-pointer rounded-full p-1 hover:bg-slate-300'
			/>
			<div className='text-center'>
				Are you sure you want to delete this post. This action cannot be undone
			</div>
			<div className='flex justify-end gap-4'>
				<Button
					onClick={closeModal}
					className='cursor-pointer hover:bg-slate-300 dark:hover:bg-black-300'
				>
					Cancel
				</Button>
				<Button className='bg-blue-500 font-semibold text-white hover:opacity-80 dark:bg-emerald-300 dark:text-black-600'>
					Delete
				</Button>
			</div>
		</form>
	);
};

export default PostDeleteForm;
