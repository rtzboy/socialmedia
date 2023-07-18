import { useState } from 'react';
import { FiCamera } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { landscapeTest } from '../../assets';
import { followState } from '../../features/user/userInfo-slice';
import { userFollow } from '../../lib/api/user/user.api';
import { UserPrivateInfo } from '../../types/user.model';
import Button from '../form/Button';
import StyledIcon from '../icons/StyledIcon';
import Modal from '../modals/Modal';
import UpdateProfilePic from './UpdateProfilePic';

type Props = {
	userHeader: UserPrivateInfo;
	postCount: number;
	followStatus?: boolean;
	privProfile?: boolean;
};

const HeaderProfile = ({ userHeader, postCount, followStatus, privProfile }: Props) => {
	const { token } = useAppSelector(state => state.user);
	const dispatchApp = useAppDispatch();
	const [disabled, setDisabled] = useState(false);
	const [contentModal, setContentModal] = useState<JSX.Element | undefined>();
	const { idUserParam } = useParams();

	const handleFollowUpdate = async () => {
		if (!idUserParam || followStatus === undefined) return;
		setDisabled(true);
		const { success } = await userFollow(token, idUserParam, followStatus);
		if (success) {
			dispatchApp(followState({ _id: userHeader._id }));
			setDisabled(false);
		}
	};

	return (
		<div className='relative overflow-hidden rounded-lg bg-slate-100'>
			<Modal>{contentModal}</Modal>
			<div
				style={{
					backgroundImage: `url("${landscapeTest}")`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover'
				}}
				className='absolute h-44 w-full'
			/>
			<div className='relative mt-8 rounded-lg p-4'>
				<div className='flex justify-center'>
					<div className='relative h-[150px] w-[150px]'>
						<img
							src={userHeader.profilePic}
							alt={userHeader.username}
							className='absolute left-0 top-0 h-[150px] w-[150px] rounded-full object-cover'
						/>
						{privProfile && (
							<StyledIcon
								onClick={() =>
									setContentModal(
										<UpdateProfilePic closeModal={() => setContentModal(undefined)} />
									)
								}
								icon={FiCamera}
								className='absolute bottom-1 right-1 cursor-pointer rounded-full bg-slate-200 p-2'
								stroke='stroke-[1.5]'
							/>
						)}
					</div>
				</div>
				<div className='py-2 text-center text-2xl font-semibold'>{userHeader.username}</div>
				<div className='relative flex w-full justify-between'>
					<div>
						<ul className='flex gap-4 text-sm'>
							<li className='flex flex-col items-center justify-center'>
								<div>Followers</div>
								<div>{userHeader.followers.length}</div>
							</li>
							<li className='flex flex-col items-center justify-center'>
								<div>Following</div>
								<div>{userHeader.following.length}</div>
							</li>
							<li className='flex flex-col items-center justify-center'>
								<div>Posts</div>
								<div>{postCount}</div>
							</li>
						</ul>
					</div>
					<div>
						{!privProfile && (
							<Button
								disabled={disabled}
								onClick={() => {
									handleFollowUpdate();
								}}
								className='bg-blue-500 text-white hover:opacity-80 disabled:opacity-50'
							>
								{followStatus ? 'Unfollow' : 'Follow'}
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderProfile;
