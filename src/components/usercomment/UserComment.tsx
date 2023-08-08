import { formatDistanceToNowStrict } from 'date-fns';
import { useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useAppSelector } from '../../app/hooks';
import useContainNode from '../../lib/hooks/useContainNode';
import { UserPostsComment } from '../../types/posts.model';
import StyledIcon from '../icons/StyledIcon';
import CommentEditBox from './CommentEditBox';
import PrivateOpts from './PrivateOpts';
import PublicOpts from './PublicOpts';

type UserCommmentType = {
	commentDetails: UserPostsComment;
	idPost: string;
	deletedFrom: string;
};

const UserComment = ({ commentDetails, idPost, deletedFrom }: UserCommmentType) => {
	const { _id: idUserLocal } = useAppSelector(state => state.userHeader);
	const { _id, comment, createdAt, user } = commentDetails;
	const [openOptsComment, setOpenOptsComment] = useState(false);
	const divRef = useRef<HTMLDivElement>(null);
	const [isEditing, setIsEditing] = useState(false);

	const Opts = idUserLocal === user._id ? PrivateOpts : PublicOpts;

	useContainNode(divRef.current, openOptsComment, setOpenOptsComment);

	return (
		<div>
			{isEditing ? (
				<div>
					<CommentEditBox
						setIsEditing={setIsEditing}
						maxHeight='max-h-[400px]'
						commentText={comment}
					/>
					<div className='pl-12 text-xs'>
						Esc to{' '}
						<span
							onClick={() => setIsEditing(false)}
							className='cursor-pointer text-blue-600 hover:underline dark:text-emerald-300'
						>
							cancel
						</span>
					</div>
				</div>
			) : (
				<div className='group flex gap-2'>
					<img
						src={user.profilePic}
						alt={user.username}
						className='h-8 w-8 rounded-full object-cover'
					/>
					<div className='min-w-[170px] max-w-[460px]'>
						<div className='flex items-center gap-2'>
							<div className='flex w-full flex-col rounded-xl bg-slate-200 px-3 py-1 dark:bg-black-300 dark:text-white'>
								<span className='font-semibold'>{user.username}</span>
								<span className='break-words leading-5 text-slate-900 dark:text-white'>
									{comment}
								</span>
							</div>
							<div ref={divRef} className='relative select-none'>
								<StyledIcon
									onClick={() => setOpenOptsComment(!openOptsComment)}
									icon={BsThreeDots}
									className='icons-opt block cursor-pointer rounded-full p-[4px] text-slate-600 opacity-0 transition-all duration-300 hover:bg-slate-200 group-hover:opacity-100'
								/>
								<div
									onClick={() => setOpenOptsComment(false)}
									className={`absolute right-2 top-8 z-30 h-auto w-[180px] overflow-hidden rounded-lg bg-slate-100 p-1 shadow-out transition-all duration-300 dark:bg-black-400 dark:shadow-black-600 ${
										openOptsComment ? 'visible opacity-100' : 'invisible opacity-0'
									}`}
								>
									<Opts
										setIsEditing={setIsEditing}
										idComment={_id}
										idPost={idPost}
										deletedFrom={deletedFrom}
									/>
								</div>
							</div>
						</div>
						<div className='flex gap-4 px-3 text-xs font-semibold text-slate-600 dark:text-gray-300'>
							<span className='cursor-pointer hover:underline'>Like</span>
							<span className='cursor-pointer hover:underline'>Reply</span>
							<span className='font-normal text-slate-700 dark:text-gray-300'>
								{formatDistanceToNowStrict(new Date(createdAt))}
							</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserComment;
