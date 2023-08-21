import SkeletonCreate from './SkeletonCreate';
import SkeletonPost from './SkeletonPost';

const SkeletonProfile = () => {
	return (
		<div className='mx-auto flex max-w-3xl flex-col gap-4 p-4'>
			<div className='flex flex-col items-center justify-between gap-3 rounded-lg bg-slate-100 p-4 dark:bg-black-400'>
				<div className='h-[30px]' />
				<div className='skeleton h-[150px] w-[150px] rounded-full bg-slate-200' />
				<div className='skeleton h-6 w-[150px] rounded-lg' />
				<div className='flex h-6 w-full items-center gap-2'>
					<div className='skeleton h-6 w-[50px] rounded-lg' />
					<div className='skeleton h-6 w-[50px] rounded-lg' />
					<div className='skeleton h-6 w-[50px] rounded-lg' />
				</div>
			</div>
			<div className='rounded-lg bg-slate-100 p-4 dark:bg-black-400'>
				<SkeletonCreate />
			</div>
			<div className='flex gap-4 rounded-lg'>
				<div className='w-[300px] rounded-lg bg-slate-100 p-4 dark:bg-black-400'>
					<div className='skeleton h-4 w-[50px] rounded-md' />
				</div>
				<SkeletonPost />
			</div>
		</div>
	);
};

export default SkeletonProfile;
