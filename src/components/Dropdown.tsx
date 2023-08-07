import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiOutlineEye, HiOutlinePencil } from 'react-icons/hi';
import { HiXMark } from 'react-icons/hi2';
import useDropdown from '../lib/hooks/useDropdown';
import useModal from '../lib/hooks/useModal';
import { UserPostsShape } from '../types/posts.model';
import StyledIcon from './icons/StyledIcon';
import Modal from './modals/Modal';

type DropdownType = { postInfo: UserPostsShape };

const Dropdown = ({ postInfo }: DropdownType) => {
	const { dropDown, dropDownRef, openDropDown, closeDropDown } = useDropdown();
	const { contentModal, openEditModal, openDeleteModal, closeModal } = useModal(postInfo);

	return (
		<div ref={dropDownRef} className='absolute right-0 top-0 h-[20px] w-[20px] select-none p-1'>
			<Modal closeModal={closeModal}>{contentModal}</Modal>
			<StyledIcon
				onClick={openDropDown}
				icon={BsThreeDotsVertical}
				className='icons-opt absolute -right-2 -top-1 cursor-pointer rounded-full p-1 text-slate-600 hover:bg-slate-300'
			/>
			<div
				onClick={closeDropDown}
				className={`absolute bottom-4 right-4 overflow-hidden rounded-lg bg-slate-100 shadow-out transition-all duration-300 dark:bg-black-300 dark:shadow-black-600 ${
					dropDown ? 'h-32 w-36 p-2' : 'h-0 w-0'
				}`}
			>
				<ul className='flex h-full flex-col justify-between gap-1'>
					<li onClick={openEditModal} className='post-opt'>
						<StyledIcon icon={HiOutlinePencil} stroke='stroke-1' />
						<span>Edit</span>
					</li>
					<li onClick={openDeleteModal} className='post-opt'>
						<StyledIcon icon={HiXMark} />
						<span>Delete</span>
					</li>
					<li className='flex cursor-default items-center gap-2 rounded-lg py-1 pl-2 text-center'>
						<StyledIcon icon={HiOutlineEye} />
						<span>Visibility</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Dropdown;
