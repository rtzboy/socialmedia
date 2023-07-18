import { useEffect, useRef, useState } from 'react';

type SlideProps = {
	arrImages: { id: number; title: string; path: string; alt: string; description: string }[];
};

const Slider = ({ arrImages }: SlideProps) => {
	const [showImg, setShowImg] = useState(1);

	const idInter = useRef<number>();

	const handleSliderChanged = (n: number) => {
		setShowImg(prev => prev + n);
	};

	useEffect(() => {
		idInter.current = setInterval(() => {
			handleSliderChanged(1);
		}, 6000);
		return () => clearInterval(idInter.current);
	}, []);

	useEffect(() => {
		if (showImg > arrImages.length) {
			setShowImg(1);
		}
		if (showImg < 1) {
			setShowImg(arrImages.length);
		}
	}, [showImg, arrImages.length]);

	return (
		<div className='relative'>
			{arrImages.map(arrElm => (
				<div
					className={`transition-all duration-[2000ms] ${
						showImg === arrElm.id
							? 'visible relative top-auto opacity-100'
							: 'invisible absolute top-0 opacity-0'
					}`}
					key={arrElm.id}
				>
					<div
						className='rounded-lg'
						style={{
							backgroundImage: `url(${arrElm.path})`,
							width: '100%',
							height: '200px',
							backgroundSize: 'cover',
							backgroundPosition: 'center'
						}}
					/>
					<div className='mt-8 text-center transition-all duration-1000'>
						<h2 className='text-lg font-semibold'>{arrElm.title}</h2>
						<p className='mt-2'>{arrElm.description}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default Slider;
