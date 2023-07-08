import { useState } from 'react';
import { male } from '../../assets';
import Wrapper from '../Wrapper';
import Modal from '../modals/Modal';
import PostCreateForm from '../post-form/PostCreateForm';

const CreatePost = () => {
	const [contentModal, setContentModal] = useState<JSX.Element | undefined>();

	return (
		<>
			<div className='flex items-center gap-2'>
				<Modal>{contentModal}</Modal>
				<img src={male} alt='' className='h-10 w-10 rounded-full' />
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
