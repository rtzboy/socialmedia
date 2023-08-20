import { useEffect, useRef, useState } from 'react';
import { AiOutlineMinus, AiOutlineSend } from 'react-icons/ai';
import { CiMaximize1 } from 'react-icons/ci';
import { HiXMark } from 'react-icons/hi2';
import { useAppSelector } from '../../../app/hooks';
import StyledIcon from '../../../components/icons/StyledIcon';
import { useChatBoxContext } from '../../../lib/contexts/ChatBoxContext';
import { socket } from '../../../socket';
import { FollowingListT } from './FollowingList';

type Props = { user: FollowingListT };

export type MessageListType = { id: string; username: string; pic: string; message: string };

const ChatBox = ({ user }: Props) => {
	const { id: senderId } = useAppSelector(state => state.userAuth);
	const { username: senderUsername, profilePic } = useAppSelector(state => state.userHeader);
	const { handleCloseChat } = useChatBoxContext();
	const [minimize, setMinimize] = useState(false);
	const [message, setMessage] = useState('');
	const [messageList, setMessageList] = useState<MessageListType[]>([]);
	const msgFocus = useRef<HTMLDivElement>(null);

	let isMinimized = minimize ? 'h-10 w-[210px]' : 'h-[400px] w-[300px]';

	const handleMessages = (recieveData: MessageListType) => {
		if (user._id !== recieveData.id) return;
		setMessageList(prevMessage => [
			...prevMessage,
			{
				id: recieveData.id,
				username: recieveData.username,
				pic: recieveData.pic,
				message: recieveData.message
			}
		]);
		msgFocus.current?.scrollIntoView({ inline: 'end', behavior: 'smooth' });
	};

	const handleSendMessage = () => {
		socket.emit('send_message', {
			senderId,
			toId: user._id,
			senderUsername,
			senderPic: profilePic,
			message
		});
		setMessageList(prevMessage => [
			...prevMessage,
			{ id: senderId, message, pic: '', username: senderUsername }
		]);
		setMessage('');
		msgFocus.current?.scrollIntoView({ inline: 'end', behavior: 'smooth' });
	};

	useEffect(() => {
		socket.on('incomingchat', handleMessages);
		return () => {
			socket.off('incomingchat', handleMessages);
		};
	}, []);

	return (
		<div
			className={`flex flex-col overflow-hidden rounded-t-lg bg-slate-100 shadow-out dark:bg-black-400 dark:shadow-black-600 ${isMinimized}`}
		>
			<div className='flex gap-2 rounded-t-lg border-b bg-slate-200 p-2 dark:bg-black-400'>
				<img src={user.profilePic} alt='' className='h-7 w-7 rounded-full' />
				<div className='flex-1'>{user.username}</div>
				<div className='flex items-center gap-2'>
					<StyledIcon
						onClick={() => setMinimize(!minimize)}
						icon={minimize ? CiMaximize1 : AiOutlineMinus}
						className='icons-opt'
					/>
					<StyledIcon
						onClick={() => handleCloseChat(user._id)}
						icon={HiXMark}
						className='icons-opt'
					/>
				</div>
			</div>
			<div className='flex h-0 flex-1 flex-col'>
				<div className='flex-1 overflow-auto px-2'>
					<div className='flex flex-col items-start gap-2 p-1'>
						{messageList.map((msgDetail, idx) => (
							<div key={idx} className={`${msgDetail.id === senderId ? 'self-end' : ''}`}>
								<div className='flex items-center gap-1'>
									{msgDetail.id === senderId ? null : (
										<img src={msgDetail.pic} alt='A' className='h-5 w-5 rounded-full' />
									)}
									<div
										className={`rounded-xl px-3 py-0.5 ${
											msgDetail.id === senderId
												? 'self-end dark:bg-emerald-600'
												: 'bg-slate-200 dark:bg-black-300'
										}`}
									>
										{msgDetail.message}
									</div>
								</div>
							</div>
						))}
						<div ref={msgFocus} children='&nbsp;' />
					</div>
				</div>
				<div className='flex gap-2 p-2'>
					<input
						onKeyUp={evt => {
							if (evt.key === 'Enter') handleSendMessage();
						}}
						value={message}
						onChange={evt => setMessage(evt.target.value)}
						type='text'
						className='inline-block w-full rounded-xl bg-slate-200 px-2 py-1 outline-none dark:bg-black-300'
						placeholder='Aa'
					/>
					{/* <PickerEmojis bottom right /> */}
					{/* we send a message to : "idTosend, usernameToSend, message" */}
					<button
						onClick={() => {
							console.log(' - first open chat :v');
							handleSendMessage();
						}}
					>
						<StyledIcon icon={AiOutlineSend} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChatBox;
