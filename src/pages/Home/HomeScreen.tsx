import CreatePost from '../../components/homepage/CreatePost';
import NewFeeds from '../../components/homepage/NewFeeds';
import FriendList from './FriendList';

const HomeScreen = () => {
	return (
		<section className=''>
			<div className='mx-auto flex w-full max-w-xl flex-col gap-4 p-4'>
				<CreatePost makeFrom='Home' />
				<NewFeeds />
			</div>
			<FriendList />
		</section>
	);
};

export default HomeScreen;
