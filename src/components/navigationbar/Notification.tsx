import { formatDistanceToNowStrict } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import httpAxiosService from '../../lib/helpers/axiosService';
import useContainNode from '../../lib/hooks/useContainNode';
import StyledIcon from '../icons/StyledIcon';

export type NotifForm = {
	notifications: INotifications[];
	unReadNoti: number;
};

export type INotifications = {
	_id: string;
	action: string;
	post?: string;
	actor: IActor;
	createdAt: Date;
	read: boolean;
	updatedAt: Date;
};

export type IActor = {
	_id: string;
	username: string;
	profilePic: string;
};

const Notification = () => {
	const { token } = useAppSelector(state => state.userAuth);
	const [notifList, setNotifList] = useState<NotifForm | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const notifRef = useRef<HTMLLIElement>(null);
	const idTime = useRef<number>();

	useContainNode(notifRef.current, isOpen, setIsOpen);

	useEffect(() => {
		handleGetNotifications();
		idTime.current = setInterval(() => {
			handleGetNotifications();
		}, 15000);
		return () => {
			clearInterval(idTime.current);
		};
	}, []);

	const handleGetNotifications = async () => {
		const response = await httpAxiosService(token).get('/userpriv/notifications');
		const sortNotifications = response.data.notif.notifications.sort((a: any, b: any) => {
			if (a.createdAt < b.createdAt) {
				return 1;
			}
			if (a.createdAt > b.createdAt) {
				return -1;
			}
			return 0;
		});

		if (response.status === 200) {
			setNotifList({
				notifications: sortNotifications,
				unReadNoti: response.data.unReadNoti
			});
		} else {
			console.log(' error');
		}
	};

	// TODO: move to api calls
	const handleUpdateNotifications = async (notification: INotifications) => {
		if (notification.read) return;
		let idx = notifList!.notifications.findIndex(idNoti => idNoti._id === notification._id);
		let toSubtract = notifList!.unReadNoti;
		notifList!.notifications[idx].read = true;
		setNotifList({ ...notifList!, unReadNoti: toSubtract - 1 });
		await httpAxiosService(token).patch(`/userpriv/notifications/read/${notification._id}`);
	};

	let openOpts = isOpen ? 'visible opacity-100' : 'invisible opacity-0';

	// TODO: now only works from follow state (ADD: comments, likes, and refactor to make clear)
	return (
		<li ref={notifRef} className='relative'>
			<div onClick={() => setIsOpen(!isOpen)}>
				<StyledIcon
					icon={IoIosNotificationsOutline}
					className='icons-opt flex h-10 w-10 items-center justify-center'
					size='1.5rem'
				/>
				<div className='absolute right-0 top-0 flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-full bg-red-700 p-0.5 text-white'>
					<span className='text-xs'>{notifList?.unReadNoti}</span>
				</div>
			</div>
			<div
				className={`absolute right-0 top-12 w-[340px] rounded-xl bg-slate-100 p-2 shadow-out transition-all dark:bg-black-400 dark:shadow-black-600 ${openOpts}`}
			>
				<span className='mb-2 inline-block px-2 text-xl font-semibold'>Notifications</span>
				<ul>
					{notifList?.notifications.map(noti => (
						<li key={noti._id} onClick={() => setIsOpen(false)}>
							<NavLink
								onClick={() => handleUpdateNotifications(noti)}
								to={`/profile/${noti.actor._id}`}
								className={`flex items-center gap-2 rounded-lg p-2 text-[15px] hover:bg-slate-300 dark:hover:bg-emerald-950 ${
									noti.read ? '' : 'font-semibold'
								}`}
							>
								<img
									className='inline-block h-7 w-7 rounded-full'
									src={noti.actor.profilePic}
									alt=''
								/>
								<div>
									<span className='font-semibold'>{noti.actor.username}</span>
									<span>{` ${noti.action === 'Follow' ? 'started following' : ''} you`}</span>
								</div>
								<span className='text-xs'>
									{formatDistanceToNowStrict(new Date(noti.createdAt))}
								</span>
								{noti.read || (
									<span className='inline-block h-2.5 w-2.5 rounded-full bg-blue-500 shadow-out shadow-blue-700 dark:bg-emerald-300 dark:shadow-emerald-600' />
								)}
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</li>
	);
};

export default Notification;
