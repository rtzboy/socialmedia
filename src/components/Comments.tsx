import { useRef, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { male } from '../assets';
import useContainNode from '../lib/hooks/useContainNode';
import PickerEmojis from './PickerEmojis';
import TextAreaAuto from './TextAreaAuto';
import StyledIcon from './icons/StyledIcon';

const Comments = () => {
	const [textComment, setTextComment] = useState('');
	const [openTest, setOpenTest] = useState(false);
	const divRef = useRef<HTMLDivElement>(null);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	useContainNode(divRef.current, openTest, setOpenTest);

	return (
		<div className='flex gap-2'>
			<div>
				<img src={male} alt='' className='h-8 w-8 rounded-full' />
			</div>
			<div
				ref={divRef}
				onClick={() => setOpenTest(true)}
				className='flex-1 rounded-xl border bg-white'
			>
				<TextAreaAuto
					textareaRef={textAreaRef}
					placeholder='Write a comment...'
					contentTxt={textComment}
					setContentTxt={comment => setTextComment(comment)}
					className='overflow-hidden bg-transparent px-2 pt-1'
					stateAdd={!!textComment}
				/>
				<div
					className={`flex justify-between px-1 transition-all duration-300 ${
						openTest ? 'h-8 overflow-visible opacity-100' : 'h-0 overflow-hidden opacity-0'
					}`}
				>
					<PickerEmojis setContWithEmoji={val => setTextComment(textComment + val.emoji)} />
					<StyledIcon
						icon={AiOutlineSend}
						size='1.2rem'
						className='flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-slate-800 hover:bg-slate-200'
					/>
				</div>
			</div>
		</div>
	);
};

export default Comments;
