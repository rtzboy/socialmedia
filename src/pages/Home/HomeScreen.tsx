import Navbar from '../../components/Navbar';
import CreatePost from '../../components/homepage/CreatePost';

const HomeScreen = () => {
	return (
		<>
			<Navbar />
			<div className='mx-auto flex max-w-xl flex-col gap-4 p-4'>
				<CreatePost />
			</div>
		</>
	);
};

export default HomeScreen;
