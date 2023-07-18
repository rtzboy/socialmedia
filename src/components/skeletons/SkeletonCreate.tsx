const SkeletonCreate = () => {
	return (
		<div className='flex items-center gap-2'>
			<div className='skeleton h-10 w-10 rounded-full' />
			<span className='skeleton relative h-10 flex-1 rounded-2xl bg-white px-4' />
		</div>
	);
};

export default SkeletonCreate;
