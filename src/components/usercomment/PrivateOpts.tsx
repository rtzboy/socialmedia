import { HiOutlinePencil, HiXMark } from 'react-icons/hi2';
import StyledIcon from '../icons/StyledIcon';

const PrivateOpts = () => {
	return (
		<ul className='flex h-full flex-col justify-between gap-1'>
			<li
				// onClick={openEditModal}
				className='flex cursor-pointer items-center gap-1 rounded-lg py-1 pl-2 text-center transition-all duration-300 hover:bg-slate-300'
			>
				<StyledIcon icon={HiOutlinePencil} stroke='stroke-1' />
				<span>Edit</span>
			</li>
			<li
				// onClick={openDeleteModal}
				className='flex cursor-pointer items-center gap-2 rounded-lg py-1 pl-2 text-center transition-all duration-300 hover:bg-slate-300'
			>
				<StyledIcon icon={HiXMark} />
				<span>Delete</span>
			</li>
		</ul>
	);
};

export default PrivateOpts;
