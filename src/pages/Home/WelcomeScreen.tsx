import { useState } from 'react';
import Slider from '../../components/Slider';
import BlobShape from '../../components/icons/BlobShape';
import { arrImages } from '../../constants/loginscreen';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';

const WelcomeScreen = () => {
	const [signStatus, setSignStatus] = useState(false);

	return (
		<section className='h-screen w-full bg-blue-100 p-4 dark:bg-black-600'>
			<div className='mx-auto w-full max-w-7xl grid-cols-2 lg:grid lg:h-full'>
				<div className='relative flex items-center justify-center'>
					<div className='absolute'>
						<BlobShape className='w-[350px] text-[#eff6ff] dark:text-black-400 md:w-[650px]' />
					</div>
					<div className='h-[400px] w-[400px]'>
						<Slider arrImages={arrImages} />
					</div>
				</div>
				<div className='relative z-50 flex justify-center'>
					{signStatus ? (
						<Signup setSignStatus={setSignStatus} />
					) : (
						<Login setSignStatus={setSignStatus} />
					)}
				</div>
			</div>
		</section>
	);
};

export default WelcomeScreen;
