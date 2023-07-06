import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type LikeCountProps = {
	count: number;
	likeStatus: boolean;
};

const LikeCount = ({ count, likeStatus }: LikeCountProps) => {
	const [likeCountChange, setLikeCountChange] = useState(count);

	useEffect(() => {
		setLikeCountChange(count);
	}, [count]);

	return (
		<AnimatePresence>
			<motion.span
				className='absolute left-5'
				initial={{ y: likeStatus ? 20 : -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: likeStatus ? 20 : -20, opacity: 0, transition: { duration: 0.5 } }}
				key={count}
				transition={{
					y: {
						type: 'just'
					}
				}}
			>
				{likeCountChange}
			</motion.span>
		</AnimatePresence>
	);
};

export default LikeCount;
