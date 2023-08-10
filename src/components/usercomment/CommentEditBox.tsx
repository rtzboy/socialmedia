import { useEffect, useRef, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateCommentOnPost } from '../../features/post/user-posts-slice';
import httpAxiosService from '../../lib/helpers/axiosService';
import PickerEmojis from '../PickerEmojis';
import TextAreaAuto from '../TextAreaAuto';
import StyledIcon from '../icons/StyledIcon';

type CommentEditT = {
	maxHeight?: string;
	commentText?: string;
	setIsEditing: (param: boolean) => void;
	idComment: string;
	idPost: string;
};

const CommentEditBox = ({
	maxHeight,
	commentText,
	setIsEditing,
	idComment,
	idPost
}: CommentEditT) => {
	const { profilePic } = useAppSelector(state => state.userHeader);
	const { token } = useAppSelector(state => state.userAuth);
	const dispatchApp = useAppDispatch();
	const [textComment, setTextComment] = useState(commentText || '');
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (!textComment) return;
		textAreaRef.current?.focus();
		textAreaRef.current?.setSelectionRange(
			textAreaRef.current?.value.length,
			textAreaRef.current?.value.length
		);
	}, []);

	const handleUpdateCommentPost = async () => {
		try {
			const response = await httpAxiosService(token).patch(`/posts/post/comment/${idPost}`, {
				comment: textComment,
				idComment
			});
			if (response.status === 200) {
				console.log(response.data);
				dispatchApp(updateCommentOnPost({ idPost, idComment, textComment }));
				setIsEditing(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			onKeyUp={evt => {
				if (evt.key === 'Escape') setIsEditing(false);
			}}
			className='flex gap-2'
		>
			<div>
				<img src={profilePic} alt='' className='h-8 w-8 rounded-full object-cover' />
			</div>
			<div className='flex-1 rounded-xl border bg-white dark:border-none dark:bg-black-300'>
				<TextAreaAuto
					textareaRef={textAreaRef}
					placeholder='Write a comment...'
					contentTxt={textComment}
					setContentTxt={comment => setTextComment(comment)}
					className={`${maxHeight} overflow-auto bg-transparent px-2 pt-1`}
					stateAdd={!!textComment}
				/>
				<div className='flex h-8 justify-between px-1 opacity-100 transition-all duration-300'>
					<PickerEmojis top setContWithEmoji={val => setTextComment(textComment + val.emoji)} />
					<StyledIcon
						onClick={handleUpdateCommentPost}
						icon={AiOutlineSend}
						size='1.2rem'
						className='icons-opt flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-slate-800 hover:bg-slate-200'
					/>
				</div>
			</div>
		</div>
	);
};

export default CommentEditBox;
