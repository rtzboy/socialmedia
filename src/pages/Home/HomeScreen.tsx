import CreatePost from '../../components/homepage/CreatePost';
import NewFeeds from '../../components/homepage/NewFeeds';

const HomeScreen = () => {
	return (
		<>
			<div className='mx-auto flex max-w-xl flex-col gap-4 p-4'>
				<CreatePost />
				<NewFeeds />
			</div>
		</>
	);
};

export default HomeScreen;
