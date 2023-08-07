import { format } from 'date-fns';
import { useState } from 'react';
import { HiClock, HiOutlinePencil } from 'react-icons/hi2';
import { ProfileInfo } from '../../types/user.model';
import StyledIcon from '../icons/StyledIcon';
import Modal from '../modals/Modal';
import UpdateDetails from './UpdateDetails';

type AboutProfileProps = {
	priv?: boolean;
	data: ProfileInfo;
};

const AboutProfile = ({ priv, data }: AboutProfileProps) => {
	const [contentModal, setContentModal] = useState<JSX.Element | undefined>();
	const { bio, createdAt } = data;

	return (
		<div className='relative grid gap-4'>
			<Modal closeModal={() => setContentModal(undefined)}>{contentModal}</Modal>
			<h4 className='text-lg font-semibold'>About</h4>
			{priv ? (
				<StyledIcon
					icon={HiOutlinePencil}
					className='icons-opt absolute right-1 top-1 cursor-pointer select-none rounded-full p-1 hover:bg-slate-300'
					onClick={() =>
						setContentModal(
							<UpdateDetails textBio={bio} closeModal={() => setContentModal(undefined)} />
						)
					}
				/>
			) : null}
			{bio === '' ? null : <p className='text-center'>{bio}</p>}
			<div className='flex items-center gap-2'>
				<StyledIcon icon={HiClock} />
				<span>Joined {format(new Date(createdAt), 'MMMM yyyy')}</span>
			</div>
		</div>
	);
};

export default AboutProfile;
