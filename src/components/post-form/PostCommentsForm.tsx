import { formatDistanceToNowStrict } from 'date-fns';
import { HiXMark } from 'react-icons/hi2';
import { useUserCommentContext } from '../../lib/contexts/UserCommentContext';
import { UserFeeds } from '../../types/user.model';
import LikeAndComments from '../homepage/LikeAndComments';
import PostContent from '../homepage/PostContent';
import StyledIcon from '../icons/StyledIcon';
import CommentBox from '../usercomment/CommentBox';
import UserComment from '../usercomment/UserComment';

type CommentsForm = {
	closeModal: () => void;
	currentPost: UserFeeds;
	likeStatus: boolean;
};

const PostCommentsForm = ({ closeModal, currentPost, likeStatus }: CommentsForm) => {
	const {} = useUserCommentContext();

	return (
		<div className='relative flex h-[90vh] flex-col gap-2 rounded-lg bg-slate-100 p-4'>
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
			<div className='invisible h-full overflow-auto transition-all hover:visible focus:visible'>
				<div className='visible relative flex flex-col gap-2'>
					{currentPost.comments.map(comment => (
						<UserComment key={comment._id} {...comment} />
					))}
				</div>
			</div>
			<div className='w-full bg-slate-100'>
				<CommentBox maxHeight='max-h-[350px]' idPost={currentPost._id} />
			</div>
		</div>
	);
};

export default PostCommentsForm;
