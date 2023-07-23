import { useRef, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { insertCommentToPost } from '../../features/post/user-posts-slice';
import httpAxiosService from '../../lib/helpers/axiosService';
import useContainNode from '../../lib/hooks/useContainNode';
import { UserFeedsComment } from '../../types/user.model';
import PickerEmojis from '../PickerEmojis';
import TextAreaAuto from '../TextAreaAuto';
import StyledIcon from '../icons/StyledIcon';

type CommentBoxProps = {
	maxHeight?: string;
	idPost?: string;
};

const initCommentForm = (profilePic: string, _id: string, username: string): UserFeedsComment => ({
	_id: '',
	user: {
		_id,
		username,
		profilePic
	},
	comment: '',
	createdAt: '',
	updatedAt: ''
});

const CommentBox = ({ maxHeight, idPost }: CommentBoxProps) => {
	// TODO: works only from calling <PostCommentsForm />
	const { profilePic, _id, username } = useAppSelector(state => state.userGlobalInfo);
	const { token } = useAppSelector(state => state.user);
	const initComment = initCommentForm(profilePic, _id, username);
	const [userComment, setUserComment] = useState(initComment);
	const [openTest, setOpenTest] = useState(false);
	const dispatchApp = useAppDispatch();

	const divRef = useRef<HTMLDivElement>(null);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	useContainNode(divRef.current, openTest, setOpenTest);

	const handleInsertComment = async () => {
		const response = await httpAxiosService(token).patch(`posts/comments/${idPost}`, {
			comment: userComment.comment
		});
		if (response.status === 200) {
			if (!idPost) return;
			const { _id, comment, createdAt, updatedAt } = response.data.insertedComment;
			dispatchApp(
				insertCommentToPost({
					userComment: { _id, comment, createdAt, updatedAt, user: userComment.user },
					idPost
				})
			);
			setUserComment(initComment);
		}
	};

	return (
		<div className='flex gap-2'>
			<div>
				<img src={profilePic} alt='' className='h-8 w-8 rounded-full object-cover' />
			</div>
			<div
				ref={divRef}
				onClick={() => setOpenTest(true)}
				className='flex-1 rounded-xl border bg-white'
			>
				<TextAreaAuto
					textareaRef={textAreaRef}
					placeholder='Write a comment...'
					contentTxt={userComment.comment}
					setContentTxt={comment => setUserComment({ ...userComment, comment })}
					className={`${maxHeight} overflow-auto bg-transparent px-2 pt-1`}
					stateAdd={!!userComment.comment}
				/>
				<div
					className={`flex justify-between px-1 transition-all duration-300 ${
						openTest ? 'h-8 overflow-visible opacity-100' : 'h-0 overflow-hidden opacity-0'
					}`}
				>
					<PickerEmojis
						bottom
						right
						setContWithEmoji={val =>
							setUserComment({ ...userComment, comment: userComment.comment + val.emoji })
						}
					/>
					<StyledIcon
						onClick={() => {
							handleInsertComment();
						}}
						icon={AiOutlineSend}
						size='1.2rem'
						className='flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-slate-800 hover:bg-slate-200'
					/>
				</div>
			</div>
		</div>
	);
};

export default CommentBox;
