import { AiFillLike, AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import StyledIcon from '../icons/StyledIcon';

type Props = {
	bottonDisable?: boolean;
	likeStatus: boolean;
	toggleLike: () => void;
	showContentOnModal?: () => void;
};

const ButtonLikeComment = (props: Props) => {
	const { likeStatus, bottonDisable, toggleLike, showContentOnModal } = props;

	return (
		<div className='flex select-none'>
			<button
				disabled={bottonDisable}
				onClick={toggleLike}
				className={`flex flex-grow cursor-pointer items-center justify-center gap-1 rounded-lg py-1 text-center transition-all hover:bg-slate-200 active:scale-[.95] ${
					likeStatus ? 'text-blue-600' : ''
				}`}
			>
				{likeStatus ? <StyledIcon icon={AiFillLike} /> : <StyledIcon icon={AiOutlineLike} />}
				<span>Like</span>
			</button>
			<span
				onClick={showContentOnModal}
				className='flex flex-grow cursor-pointer items-center justify-center gap-1 rounded-lg py-1 text-center transition-all hover:bg-slate-200'
			>
				<StyledIcon icon={AiOutlineComment} />
				<span>Comment</span>
			</span>
		</div>
	);
};

export default ButtonLikeComment;
