import { VscReport } from 'react-icons/vsc';
import StyledIcon from '../icons/StyledIcon';

const PublicOpts = () => {
	return (
		<ul className='flex h-full flex-col justify-between gap-1'>
			<li
				// onClick={openEditModal}
				className='flex cursor-pointer items-center gap-2 rounded-lg py-1 pl-2 text-center transition-all duration-300 hover:bg-slate-300'
			>
				<StyledIcon icon={VscReport} stroke='stroke-[.1]' />
				<span>Report comment</span>
			</li>
		</ul>
	);
};

export default PublicOpts;
