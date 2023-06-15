import { useState } from 'react';
import { profileTest } from '../../assets';
import Wrapper from '../Wrapper';
import Button from '../form/Button';

const CreatePost = () => {
	const [content, setContent] = useState('');

	return (
		<>
			<h2 className='mb-4 text-lg'>Create Post</h2>
			<form className='flex w-full flex-col items-end gap-4'>
				<div className='flex w-full items-center justify-center gap-4 overflow-hidden rounded-lg border bg-white pl-4'>
					<img
						src={profileTest}
						alt=''
						className={`rounded-full transition-all duration-300 ${
							!!content ? 'h-[60px] w-[60px]' : 'h-[30px] w-[30px]'
						}`}
					/>
					<textarea
						value={content}
						onChange={evt => setContent(evt.target.value)}
						className={`w-full resize-none bg-transparent py-2 outline-none transition-all duration-300 ${
							!!content ? 'h-[110px]' : 'h-[50px]'
						}`}
						placeholder='Write somenthing here...'
					></textarea>
				</div>
				<Button type='submit' className='bg-sky-600 font-semibold text-white'>
					Post
				</Button>
			</form>
		</>
	);
};

export default Wrapper(CreatePost);
