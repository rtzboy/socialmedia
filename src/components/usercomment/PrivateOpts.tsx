import { Dispatch, SetStateAction } from 'react';
import { HiOutlinePencil, HiXMark } from 'react-icons/hi2';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { rmvCommentOnPost } from '../../features/post/user-posts-slice';
import { rmvCommentProfPost } from '../../features/user/user-profile-slice';
import httpAxiosService from '../../lib/helpers/axiosService';
import StyledIcon from '../icons/StyledIcon';

type OptsType = {
	setIsEditing: Dispatch<SetStateAction<boolean>>;
	idComment: string;
	idPost: string;
	deletedFrom: string;
};

const PrivateOpts = ({ setIsEditing, idComment, idPost, deletedFrom }: OptsType) => {
	const { token } = useAppSelector(state => state.userAuth);
	const dispatchApp = useAppDispatch();
	const handleDeleteComment = async () => {
		try {
			const response = await httpAxiosService(token).patch(`/posts/post/${idPost}`, { idComment });
			if (response.status === 200) {
				if (deletedFrom === 'UserPost') dispatchApp(rmvCommentOnPost({ idPost, idComment }));
				if (deletedFrom === 'ProfilePost') dispatchApp(rmvCommentProfPost({ idPost, idComment }));
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ul className='flex h-full flex-col justify-between gap-1'>
			<li onClick={() => setIsEditing(true)} className='post-opt '>
				<StyledIcon icon={HiOutlinePencil} stroke='stroke-1' />
				<span>Edit</span>
			</li>
			<li onClick={handleDeleteComment} className='post-opt'>
				<StyledIcon icon={HiXMark} />
				<span>Delete</span>
			</li>
		</ul>
	);
};

export default PrivateOpts;
