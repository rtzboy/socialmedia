import { useAppDispatch } from '../../app/hooks';
import { landscapeTest } from '../../assets';
import { followState } from '../../features/user/userInfo-slice';
import { UserPrivateInfo } from '../../types/user.model';
import Button from '../form/Button';

type Props = {
	userHeader: UserPrivateInfo;
	postCount: number;
	followStatus?: boolean;
	privProfile?: boolean;
};

const HeaderProfile = ({ userHeader, postCount, followStatus, privProfile }: Props) => {
	const dispatchApp = useAppDispatch();

	return (
		<div className='relative overflow-hidden rounded-lg bg-slate-100'>
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
					<img
						src='https://i.ibb.co/1n16kyG/D2.png'
						alt=''
						className='h-[150px] w-[150px] rounded-full'
					/>
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
								onClick={() => {
									dispatchApp(followState({ _id: userHeader._id }));
								}}
								className='bg-blue-500 text-white'
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