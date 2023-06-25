import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiOutlineEye, HiOutlinePencil } from 'react-icons/hi';
import { HiXMark } from 'react-icons/hi2';
import useDropdown from '../lib/hooks/useDropdown';

const Dropdown = () => {
	const { dropDown, dropDownRef, openDropDown, closeDropDown } = useDropdown();

	return (
		<div className='absolute right-0 top-0 h-[20px] w-[20px] p-1'>
			<span
				onClick={openDropDown}
				className='absolute -right-2 -top-1 cursor-pointer rounded-full p-1 text-slate-600 hover:bg-slate-300'
			>
				<BsThreeDotsVertical size='1.3rem' />
			</span>
			<div
				ref={dropDownRef}
				onClick={closeDropDown}
				className={`absolute bottom-4 right-4 overflow-hidden rounded-lg bg-slate-100 shadow-out transition-all duration-500 ${
					dropDown ? 'h-32 w-36 p-2' : 'h-0 w-0'
				}`}
			>
				<ul className='flex h-full flex-col justify-between gap-1'>
					<li className='flex cursor-pointer items-center gap-2 rounded-lg py-1 pl-2 text-center transition-all duration-300 hover:bg-slate-300'>
						<span>
							<HiOutlinePencil size='1.3rem' className='stroke-1' />
						</span>
						<span>Edit</span>
					</li>
					<li className='flex cursor-pointer items-center gap-2 rounded-lg py-1 pl-2 text-center transition-all duration-300 hover:bg-slate-300'>
						<span>
							<HiXMark size='1.3rem' />
						</span>
						<span>Delete</span>
					</li>
					<li className='flex cursor-pointer items-center gap-2 rounded-lg py-1 pl-2 text-center transition-all duration-300 hover:bg-slate-300'>
						<span>
							<HiOutlineEye size='1.3rem' />
						</span>
						<span>Visibility</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Dropdown;
