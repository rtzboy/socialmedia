import { useEffect, useRef, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { useAppSelector } from '../../app/hooks';
import PickerEmojis from '../PickerEmojis';
import TextAreaAuto from '../TextAreaAuto';
import StyledIcon from '../icons/StyledIcon';

type CommentEditBoxProps = {
	maxHeight?: string;
	commentText?: string;
	setIsEditing: (param: boolean) => void;
};

const CommentEditBox = ({ maxHeight, commentText, setIsEditing }: CommentEditBoxProps) => {
	const { profilePic } = useAppSelector(state => state.userHeader);
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
						onClick={() => console.log(textComment)}
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
