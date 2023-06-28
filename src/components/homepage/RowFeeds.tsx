import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { male } from '../../assets';
import Dropdown from '../Dropdown';
import Wrapper from '../Wrapper';
import { UserFeeds } from './NewFeeds';

export interface RowFeedsType {
	postInfo: UserFeeds;
}

const RowFeeds = ({ postInfo }: RowFeedsType) => {
	const { id } = useAppSelector(state => state.user);
	let allowOpts = id === postInfo.author._id;

	return (
		<div className='flex flex-col gap-4'>
			<div className='relative flex items-center gap-4'>
				<img src={male} alt='' className='h-11 w-11 rounded-full' />
				<div className='flex flex-col'>
					<span className='font-semibold'>
						<NavLink to={`/profile/${postInfo.author._id}`}>{postInfo.author.username}</NavLink>
					</span>
					<span className='text-sm italic text-slate-700'>
						{formatDistanceToNowStrict(new Date(postInfo.createdAt))}
					</span>
				</div>
				{allowOpts && <Dropdown postInfo={postInfo} />}
			</div>
			<div>{postInfo.content}</div>
			<div className='flex'>
				<span className='flex-grow cursor-pointer rounded-lg py-1 text-center transition-all hover:bg-slate-200'>
					like
				</span>
				<span className='flex-grow cursor-pointer rounded-lg py-1 text-center transition-all hover:bg-slate-200'>
					comment
				</span>
			</div>
		</div>
	);
};

export default Wrapper(RowFeeds);
