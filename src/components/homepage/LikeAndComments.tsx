import { AiFillLike } from 'react-icons/ai';
import LikeCount from '../LikeCount';
import StyledIcon from '../icons/StyledIcon';

type Props = {
	likeCount: number;
	commentCount: number;
	likeStatus: boolean;
};

const LikeAndComments = ({ likeCount, commentCount, likeStatus }: Props) => {
	if (!likeCount && !commentCount) return null;
	return (
		<div className='flex select-none items-center justify-between gap-1'>
			{!!likeCount ? (
				<div className='relative flex items-center gap-1'>
					<StyledIcon icon={AiFillLike} size='1rem' className='text-blue-500' />
					<LikeCount count={likeCount} likeStatus={likeStatus} />
				</div>
			) : (
				<span></span>
			)}
			{!!commentCount && (
				<div>{`${commentCount} ${commentCount > 1 ? 'comments' : 'comment'}`}</div>
			)}
		</div>
	);
};

export default LikeAndComments;
