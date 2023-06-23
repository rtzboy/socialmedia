import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { NavLink } from 'react-router-dom';
import { profileTest } from '../../assets';
import Wrapper from '../Wrapper';
import { UserFeeds } from './NewFeeds';

interface RowFeedsType extends UserFeeds {}

const RowFeeds = ({ author, content, createdAt }: RowFeedsType) => {
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex items-center gap-4'>
				<img src={profileTest} alt='' className='h-11 w-11 rounded-full' />
				<div className='flex flex-col'>
					<span className='font-semibold'>
						<NavLink to={`/profile/${author._id}`}>{author.username}</NavLink>
					</span>
					<span className='text-sm italic text-slate-700'>
						{formatDistanceToNowStrict(new Date(createdAt))}
					</span>
				</div>
			</div>
			<div>{content}</div>
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
