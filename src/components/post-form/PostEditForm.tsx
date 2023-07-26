import { formatDistanceToNowStrict } from 'date-fns';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateProfPost } from '../../features/user/user-profile-slice';
import { editPost } from '../../lib/api/posts/post.api';
import { UserPostsShape } from '../../types/posts.model';
import PickerEmojis from '../PickerEmojis';
import TextAreaAuto from '../TextAreaAuto';
import Button from '../form/Button';
import StyledIcon from '../icons/StyledIcon';
import { removeExtraSpaces } from './PostCreateForm';

type PostEditFormProps = {
	closeModal: () => void;
	currentPost: UserPostsShape;
};

const PostEditForm = ({ closeModal, currentPost }: PostEditFormProps) => {
	const { token } = useAppSelector(state => state.userAuth);
	const dispatchApp = useAppDispatch();
	const [value, setValue] = useState(currentPost.content);
	const [isSaving, setIsSaving] = useState(false);
	const refTextArea = useRef<HTMLTextAreaElement>(null);

	let isDisabled = value === currentPost.content;

	const handleEditPost = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setIsSaving(true);
		const success = await editPost(token, removeExtraSpaces(value), currentPost._id);
		if (success) {
			dispatchApp(updateProfPost({ idPost: currentPost._id, content: removeExtraSpaces(value) }));
			setIsSaving(false);
			closeModal();
		}
	};

	useEffect(() => {
		refTextArea.current?.focus();
		refTextArea.current?.setSelectionRange(
			refTextArea.current?.value.length,
			refTextArea.current?.value.length
		);
	}, []);

	return (
		<form
			onSubmit={handleEditPost}
			className='relative flex flex-col gap-2 rounded-lg bg-slate-100 p-4'
		>
			<div className='text-center text-lg font-semibold'>Edit post</div>
			<StyledIcon
				icon={HiXMark}
				onClick={closeModal}
				size='1.5rem'
				className='absolute right-3 top-3 cursor-pointer rounded-full bg-slate-200 p-1 hover:bg-slate-300'
			/>
			<div className='relative flex items-center gap-4'>
				<img
					src={currentPost.author.profilePic}
					alt={currentPost.author.username}
					className='h-11 w-11 rounded-full object-cover'
				/>
				<div className='flex flex-col'>
					<span className='font-semibold'>
						<span>{currentPost.author.username}</span>
					</span>
					<span className='text-sm italic text-slate-700'>
						{formatDistanceToNowStrict(new Date(currentPost.createdAt))}
					</span>
				</div>
			</div>
			<div>
				<TextAreaAuto
					contentTxt={value}
					setContentTxt={val => setValue(val)}
					className='bg-transparent'
					textareaRef={refTextArea}
				/>
			</div>
			<div>
				<PickerEmojis
					bottom
					setContWithEmoji={emojiObj => setValue(value + ' ' + emojiObj.emoji)}
				/>
			</div>
			<Button
				disabled={!value || isSaving || isDisabled}
				className='bg-blue-500 font-semibold text-white disabled:opacity-50'
			>
				Save
			</Button>
		</form>
	);
};

export default PostEditForm;
