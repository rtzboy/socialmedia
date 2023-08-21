import CreatePost from '../../components/homepage/CreatePost';
import NewFeeds from '../../components/homepage/NewFeeds';

const HomeScreen = () => {
	return (
		<section>
			<div className='mx-auto flex w-full max-w-xl flex-col gap-4 p-4'>
				<CreatePost makeFrom='Home' />
				<NewFeeds />
			</div>
		</section>
	);
};

export default HomeScreen;
