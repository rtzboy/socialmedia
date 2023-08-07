interface SkeletonPostType {}

const SkeletonPost = ({}: SkeletonPostType) => {
	return (
		<div className='flex w-full flex-col gap-4 rounded-md bg-slate-100 p-4 dark:bg-black-400'>
			<div className='flex gap-4'>
				<div className='skeleton h-11 w-11 rounded-full'></div>
				<div className='flex flex-1 flex-col gap-4'>
					<p className='skeleton h-2 w-24 rounded-3xl'></p>
					<p className='skeleton h-2 w-24 rounded-3xl'></p>
				</div>
			</div>
			<div className='flex flex-col gap-2'>
				<p className='skeleton h-2 w-full rounded-3xl'></p>
				<p className='skeleton h-2 w-full rounded-3xl'></p>
				<p className='skeleton h-2 w-full rounded-3xl'></p>
			</div>
		</div>
	);
};

export default SkeletonPost;
