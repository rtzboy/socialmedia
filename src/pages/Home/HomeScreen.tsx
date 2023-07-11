import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CreatePost from '../../components/homepage/CreatePost';
import NewFeeds from '../../components/homepage/NewFeeds';
import { createUserInfo } from '../../features/user/userInfo-slice';
import { userInformation } from '../../lib/api/user/user.api';

const HomeScreen = () => {
	const { token, id } = useAppSelector(state => state.user);
	const { userInfo } = useAppSelector(state => state.userGlobalInfo);
	const dispatchApp = useAppDispatch();

	const settingUserInfoGlobal = async () => {
		const { result, error: err } = await userInformation(token, id);
		if (result !== null) {
			dispatchApp(createUserInfo(result));
		} else {
			// TODO: modify
			console.log(err);
		}
	};
	useEffect(() => {
		if (userInfo._id) return;
		settingUserInfoGlobal();
	}, []);

	return (
		<>
			<div className='mx-auto flex max-w-2xl flex-col gap-4 p-4'>
				<CreatePost />
				<NewFeeds />
			</div>
		</>
	);
};

export default HomeScreen;
