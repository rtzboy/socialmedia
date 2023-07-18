import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import Wrapper from '../Wrapper';
import Modal from '../modals/Modal';
import PostCreateForm from '../post-form/PostCreateForm';
import SkeletonCreate from '../skeletons/SkeletonCreate';

const CreatePost = () => {
	const { profilePic } = useAppSelector(state => state.userGlobalInfo);
	const [contentModal, setContentModal] = useState<JSX.Element | undefined>();

	if (!profilePic) return <SkeletonCreate />;

	return (
		<>
			<div className='flex items-center gap-2'>
				<Modal>{contentModal}</Modal>
				<img src={profilePic} alt='Username' className='h-10 w-10 rounded-full' />
				<span
					onClick={() =>
						setContentModal(<PostCreateForm closeModal={() => setContentModal(undefined)} />)
					}
					className='relative h-10 flex-1 rounded-2xl bg-white px-4 transition-all hover:cursor-pointer hover:bg-slate-200'
				>
					<span className='absolute top-1/2 -translate-y-1/2 bg-transparent italic text-slate-500'>
						Write somenthing here...
					</span>
				</span>
			</div>
		</>
	);
};

export default Wrapper(CreatePost);
