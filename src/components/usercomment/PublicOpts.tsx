import toast from 'react-hot-toast';
import { VscReport } from 'react-icons/vsc';
import StyledIcon from '../icons/StyledIcon';

const PublicOpts = () => {
	return (
		<ul className='flex h-full flex-col justify-between gap-1'>
			<li
				onClick={() => toast.success('Thanks for your report!', { duration: 3500 })}
				className='post-opt '
			>
				<StyledIcon icon={VscReport} stroke='stroke-[.1]' />
				<span>Report comment</span>
			</li>
		</ul>
	);
};

export default PublicOpts;
