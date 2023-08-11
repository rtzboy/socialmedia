import { useState } from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { socket } from '../../socket';
import StyledIcon from '../icons/StyledIcon';

const ConnectionManager = () => {
	const [open, setOpen] = useState(false);

	let openStatus = open ? 'h-[50px] pb-4' : 'h-0 pb-0 ';

	return (
		<div className='px-4'>
			<div className='items-start pb-2'>
				<div className='flex items-center gap-2'>
					<span>Status</span>
					<button
						className={`icons-opt rounded-full p-0.5 transition-all hover:bg-slate-200 ${
							open ? 'rotate-180' : ''
						}`}
					>
						<StyledIcon onClick={() => setOpen(!open)} icon={AiOutlineArrowDown} />
					</button>
				</div>
			</div>
			<div
				className={`flex items-center justify-center gap-2 overflow-hidden transition-all duration-500 ${openStatus}`}
			>
				<button
					className='rounded-lg bg-green-300 px-3 hover:opacity-80 dark:text-black-600'
					onClick={() => socket.connect()}
				>
					Connect
				</button>
				<button
					className='rounded-lg bg-slate-300 px-3 hover:opacity-90 dark:bg-black-300 dark:text-white'
					onClick={() => socket.disconnect()}
				>
					Disconnect
				</button>
			</div>
		</div>
	);
};

export default ConnectionManager;
