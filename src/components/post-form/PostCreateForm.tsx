import { useRef, useState } from 'react';
import { BsCheck2 } from 'react-icons/bs';
import { FiLoader } from 'react-icons/fi';
import { HiXMark } from 'react-icons/hi2';
import { useAppSelector } from '../../app/hooks';
import { makePost } from '../../lib/api/posts/post.api';
import { useUserPostsContext } from '../../lib/contexts/userPosts/UserPostsContext';
import PickerEmojis from '../PickerEmojis';
import TextAreaAuto from '../TextAreaAuto';
import Button from '../form/Button';
import StyledIcon from '../icons/StyledIcon';

type PostCreateFormProps = {
	closeModal: () => void;
};

const PostCreateForm = ({ closeModal }: PostCreateFormProps) => {
	const { token, username } = useAppSelector(state => state.user);
	const { profilePic } = useAppSelector(state => state.userGlobalInfo);
	const { dispatchUserProfile } = useUserPostsContext();
	const [postState, setPostState] = useState({
		content: '',
		loading: false,
		check: false,
		msgPost: ''
	});
	const [selectText, setSelectText] = useState({ start: 0, end: 0 });
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const makingPost = async () => {
		let filterText = removeExtraSpaces(postState.content);
		const { newPost, message, success } = await makePost(filterText, token);
		if (success && newPost !== null) {
			setPostState(prevState => ({
				...prevState,
				loading: false,
				check: true,
				content: '',
				msgPost: ''
			}));
			setTimeout(() => {
				setPostState(prevState => ({ ...prevState, check: false }));
				closeModal();
			}, 1500);
			dispatchUserProfile({ type: 'CREATE_POST', payload: newPost });
		} else {
			setPostState(prevState => ({ ...prevState, loading: false, msgPost: message }));
		}
	};

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setPostState(prevState => ({ ...prevState, loading: true }));
		makingPost();
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='relative flex flex-col gap-2 rounded-lg bg-slate-100 p-4'
		>
			<div className='text-center text-lg font-semibold'>Create post</div>
			<StyledIcon
				icon={HiXMark}
				onClick={closeModal}
				size='1.5rem'
				className='absolute right-3 top-3 cursor-pointer rounded-full bg-slate-200 p-1 hover:bg-slate-300'
			/>
			<hr />
			<div className='relative flex items-center gap-4'>
				<img src={profilePic} alt='' className='h-9 w-9 rounded-full object-cover' />
				<div className='flex flex-col'>
					<span className='font-semibold'>
						<span>{username}</span>
					</span>
					<span>&nbsp;</span>
				</div>
			</div>
			<div>
				<TextAreaAuto
					contentTxt={postState.content}
					setContentTxt={val => setPostState({ ...postState, content: val })}
					textareaRef={textAreaRef}
					setSelectText={setSelectText}
					className='bg-transparent text-lg'
					stateAdd
				/>
			</div>
			<div>
				{/* TODO: error create leftside */}
				<PickerEmojis
					setContWithEmoji={emojiObj => {
						setPostState({
							...postState,
							content:
								postState.content.slice(0, selectText.start) +
								` ${emojiObj.emoji} ` +
								postState.content.slice(selectText.end!)
						});
					}}
				/>
			</div>
			<div className='italic text-red-500'>{postState.msgPost}</div>
			<Button
				disabled={postState.loading || !postState.content}
				type='submit'
				className='flex items-center justify-center gap-2 bg-sky-600 font-semibold text-white disabled:bg-slate-400'
			>
				{postState.loading && (
					<StyledIcon
						icon={FiLoader}
						stroke='stroke-1'
						size='1.5rem'
						className='animate-spin text-white'
					/>
				)}
				{postState.check && (
					<StyledIcon icon={BsCheck2} size='1.5rem' stroke='stroke-1' className='text-green-300' />
				)}
				<span>Post</span>
			</Button>
		</form>
	);
};

export const removeExtraSpaces = (str: string): string =>
	str.replace(/  +/g, ' ').trim().replace(/\n+/g, '\n');

export default PostCreateForm;
