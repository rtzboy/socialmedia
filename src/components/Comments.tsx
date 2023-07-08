import EmojiPicker, { Emoji, EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { BsEmojiSmile } from 'react-icons/bs';
import { male } from '../assets';
import StyledIcon from './icons/StyledIcon';

type CommentsProps = {};

const Comments = (props: CommentsProps) => {
	const [textComment, setTextComment] = useState('');

	const [selectedEmoji, setSelectedEmoji] = useState<string>('');
	const [openChooseEmoji, setOpenChooseEmoji] = useState(false);

	const refTest = useRef<any>(null);

	const handlerEmoji = (emojiData: EmojiClickData, event: MouseEvent) => {
		setSelectedEmoji(emojiData.unified);
	};

	useEffect(() => {
		if (!openChooseEmoji) return;
		const handleClickOutside = (evt: MouseEvent) => {
			if (!refTest.current?.contains(evt.target as Node)) setOpenChooseEmoji(false);
		};
		document.addEventListener('click', handleClickOutside, true);
		return () => document.removeEventListener('click', handleClickOutside, true);
	}, [openChooseEmoji]);

	return (
		<div className='flex gap-2'>
			<div>
				<img src={male} alt='' className='h-8 w-8 rounded-full' />
			</div>
			<div className='flex-1 rounded-xl border bg-white'>
				<div
					className='grid after:invisible after:col-start-1 after:col-end-2 after:row-start-1 after:row-end-2 after:whitespace-pre-wrap after:rounded-lg after:border after:px-2 after:py-1 after:content-[attr(data-replicated-value)]'
					data-replicated-value={textComment}
				>
					<textarea
						className={`col-start-1 col-end-2 row-start-1 row-end-2 resize-none overflow-hidden bg-transparent px-2 py-1 outline-none ${
							!!textComment ? 'h-auto' : 'h-9'
						}`}
						value={textComment}
						placeholder='Write a comment'
						onChange={evt => setTextComment(evt.target.value)}
					></textarea>
					{textComment && (
						<div className='flex justify-between p-1'>
							<div ref={refTest} className='relative'>
								<StyledIcon
									onClick={() => setOpenChooseEmoji(true)}
									icon={BsEmojiSmile}
									size='1.2rem'
									className='block cursor-pointer rounded-full p-1 text-slate-800 hover:bg-slate-200'
								/>
								<span
									className={`absolute bottom-0 right-0 transition-all duration-500 ${
										openChooseEmoji ? 'visible block opacity-100' : 'invisible hidden opacity-0'
									}`}
								>
									<EmojiPicker
										emojiStyle={EmojiStyle.FACEBOOK}
										searchDisabled
										onEmojiClick={handlerEmoji}
										previewConfig={{
											showPreview: false
										}}
										height={400}
										width={300}
									/>
									<Emoji unified={selectedEmoji} size={22} />
								</span>
							</div>
							<StyledIcon
								icon={AiOutlineSend}
								size='1.2rem'
								className='block cursor-pointer rounded-full p-1 text-slate-800 hover:bg-slate-200'
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Comments;
