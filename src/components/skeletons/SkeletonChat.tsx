import { BsArrowLeft } from 'react-icons/bs';
import StyledIcon from '../icons/StyledIcon';

const SkeletonChat = () => {
	return (
		<ul className='flex flex-col gap-2 p-4'>
			<li className='mb-2 flex items-center gap-2'>
				<StyledIcon
					onClick={() => {}}
					icon={BsArrowLeft}
					className='cursor-pointer rounded-full p-1 hover:bg-slate-200 dark:hover:bg-emerald-950'
				/>
				<span className='inline-block text-xl font-semibold'>Following List</span>
				<span className='inline-block h-2 w-2 rounded-full shadow-out' />
			</li>
			<li className='ml-2 flex items-center gap-2'>
				<span className='skeleton inline-block h-8 w-8 rounded-full' />
				<span className='skeleton h-4 w-32 rounded-md'></span>
			</li>
			<li className='ml-2 flex items-center gap-2'>
				<span className='skeleton inline-block h-8 w-8 rounded-full' />
				<span className='skeleton h-4 w-32 rounded-md'></span>
			</li>
			<li className='ml-2 flex items-center gap-2'>
				<span className='skeleton inline-block h-8 w-8 rounded-full' />
				<span className='skeleton h-4 w-32 rounded-md'></span>
			</li>
		</ul>
	);
};

export default SkeletonChat;
