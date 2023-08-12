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

	let isLiked = likeStatus ? 'text-blue-600 dark:text-emerald-300' : '';

	return (
		<div className='flex select-none'>
			<button
				disabled={bottonDisable}
				onClick={toggleLike}
				className={`flex flex-grow cursor-pointer items-center justify-center gap-1 rounded-lg py-1 text-center transition-all hover:bg-slate-200 active:scale-[.95] dark:hover:bg-emerald-950 ${isLiked}`}
			>
				<StyledIcon icon={likeStatus ? AiFillLike : AiOutlineLike} />
				<span>Like</span>
			</button>
			<button
				onClick={showContentOnModal}
				className='flex flex-grow cursor-pointer items-center justify-center gap-1 rounded-lg py-1 text-center transition-all hover:bg-slate-200 dark:hover:bg-emerald-950'
			>
				<StyledIcon icon={AiOutlineComment} />
				<span>Comment</span>
			</button>
		</div>
	);
};

export default ButtonLikeComment;
