import { FormEvent, useState } from 'react';
import { BsCheck2 } from 'react-icons/bs';
import { FiLoader } from 'react-icons/fi';
import { useAppSelector } from '../../app/hooks';
import { male } from '../../assets';
import { makePost } from '../../lib/api/posts/post.api';
import { useUserPostsContext } from '../../lib/contexts/userPosts/UserPostsContext';
import Wrapper from '../Wrapper';
import Button from '../form/Button';

const CreatePost = () => {
	const { userProfileInfo, setUserProfileInfo } = useUserPostsContext();
	const { token } = useAppSelector(state => state.user);
	const [postState, setPostState] = useState({
		content: '',
		loading: false,
		check: false,
		msgPost: ''
	});

	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setPostState(prevState => ({ ...prevState, loading: true }));
		makingPost();
	};

	const makingPost = async () => {
		const { newPost, message, success } = await makePost(postState.content, token);
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
			}, 1500);
			if (!userProfileInfo) return;
			setUserProfileInfo({
				...userProfileInfo,
				posts: [newPost, ...(userProfileInfo?.posts ?? [])]
			});
		} else {
			setPostState(prevState => ({ ...prevState, loading: false, msgPost: message }));
		}
	};

	return (
		<>
			<h2 className='mb-4 text-lg'>Create Post</h2>
			<form onSubmit={handleSubmit} className='flex w-full flex-col items-end gap-4'>
				<div className='flex w-full items-center justify-center gap-4 overflow-hidden rounded-lg border bg-white pl-4'>
					<img
						src={male}
						alt=''
						className={`rounded-full transition-all duration-300 ${
							!!postState.content ? 'h-[60px] w-[60px]' : 'h-[30px] w-[30px]'
						}`}
					/>
					<textarea
						value={postState.content}
						onChange={evt =>
							setPostState(prevState => ({ ...prevState, content: evt.target.value }))
						}
						className={`w-full resize-none bg-transparent py-2 outline-none transition-all duration-300 ${
							!!postState.content ? 'h-[110px]' : 'h-[50px]'
						}`}
						placeholder='Write somenthing here...'
					></textarea>
				</div>
				<div className='italic text-red-500'>{postState.msgPost}</div>
				<Button
					disabled={postState.loading || !postState.content}
					type='submit'
					className='flex items-center gap-2 bg-sky-600 font-semibold text-white disabled:opacity-50'
				>
					{postState.loading && (
						<span className='animate-spin text-white'>
							<FiLoader size='1.5rem' className='stroke-1' />
						</span>
					)}
					{postState.check && (
						<span className='text-green-300'>
							<BsCheck2 size='1.5rem' className='stroke-1' />
						</span>
					)}
					Post
				</Button>
			</form>
		</>
	);
};

export default Wrapper(CreatePost);
