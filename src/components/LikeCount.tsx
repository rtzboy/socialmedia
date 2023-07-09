import { AnimatePresence, motion } from 'framer-motion';

type LikeCountProps = {
	count: number;
	likeStatus: boolean;
};

const LikeCount = ({ count, likeStatus }: LikeCountProps) => (
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
			{count}
		</motion.span>
	</AnimatePresence>
);

export default LikeCount;
