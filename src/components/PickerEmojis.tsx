import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import StyledIcon from './icons/StyledIcon';

type PickerEmojisProps = {
	contWithEmoji: string;
	setContWithEmoji: (str: string) => void;
};

const PickerEmojis = ({ contWithEmoji, setContWithEmoji }: PickerEmojisProps) => {
	const [openChooseEmoji, setOpenChooseEmoji] = useState(false);
	const [selectedEmoji, setSelectedEmoji] = useState<{ emoji: string; unified: string }>();
	const refContainer = useRef<HTMLDivElement>(null);

	const handlerEmoji = (emojiData: EmojiClickData) => setSelectedEmoji(emojiData);

	useEffect(() => {
		if (!openChooseEmoji) return;
		const handleClickOutside = (evt: MouseEvent) => {
			if (!refContainer.current?.contains(evt.target as Node)) setOpenChooseEmoji(false);
		};
		document.addEventListener('click', handleClickOutside, true);
		return () => document.removeEventListener('click', handleClickOutside, true);
	}, [openChooseEmoji]);

	useEffect(() => {
		if (!selectedEmoji) return;
		setContWithEmoji(contWithEmoji?.concat(' ', selectedEmoji.emoji));
		setSelectedEmoji(undefined);
	}, [selectedEmoji]);

	return (
		<div ref={refContainer} className='relative h-8 w-8'>
			<StyledIcon
				onClick={() => setOpenChooseEmoji(!openChooseEmoji)}
				icon={BsEmojiSmile}
				size='1.2rem'
				className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-1 text-slate-800 hover:bg-slate-200'
			/>
			<span className='absolute bottom-8 right-0'>
				{openChooseEmoji && (
					<EmojiPicker
						onEmojiClick={handlerEmoji}
						emojiStyle={EmojiStyle.FACEBOOK}
						searchDisabled
						previewConfig={{
							showPreview: false
						}}
						lazyLoadEmojis
						height={300}
						width={300}
					/>
				)}
			</span>
		</div>
	);
};

export default PickerEmojis;
