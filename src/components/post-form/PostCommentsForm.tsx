import { formatDistanceToNowStrict } from 'date-fns';
import { HiXMark } from 'react-icons/hi2';
import { UserFeeds } from '../../types/user.model';
import LikeAndComments from '../homepage/LikeAndComments';
import PostContent from '../homepage/PostContent';
import StyledIcon from '../icons/StyledIcon';

type CommentsForm = {
	closeModal: () => void;
	currentPost: UserFeeds;
	likeStatus: boolean;
};

const PostCommentsForm = ({ closeModal, currentPost, likeStatus }: CommentsForm) => {
	return (
		<div className='relative flex flex-col gap-3 rounded-lg bg-slate-100 p-4'>
			<StyledIcon
				icon={HiXMark}
				onClick={closeModal}
				size='1.5rem'
				className='absolute right-3 top-3 cursor-pointer rounded-full bg-slate-200 p-1 hover:bg-slate-300'
			/>
			<div className='text-center text-lg font-semibold'>{`${currentPost.author.username}'s Post`}</div>
			<div className='relative flex items-center gap-4'>
				<img
					src={currentPost.author.profilePic}
					alt={currentPost.author.username}
					className='h-11 w-11 rounded-full object-cover'
				/>
				<div className='flex flex-col'>
					<span className='font-semibold'>
						<span>{currentPost.author.username}</span>
					</span>
					<span className='text-sm italic text-slate-700'>
						{formatDistanceToNowStrict(new Date(currentPost.createdAt))}
					</span>
				</div>
			</div>
			<div className='flex items-center'>
				<PostContent content={currentPost.content} />
			</div>
			<LikeAndComments
				likeStatus={likeStatus}
				likeCount={currentPost.likeCount}
				commentCount={currentPost.comments.length}
			/>
			<hr />
		</div>
	);
};

export default PostCommentsForm;
