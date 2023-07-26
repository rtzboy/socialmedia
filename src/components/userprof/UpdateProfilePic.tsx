import { ChangeEvent, useRef, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { HiOutlineUserCircle, HiXMark } from 'react-icons/hi2';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updatePicHeader } from '../../features/user/user-header-slice';
import { updateProfPicture } from '../../features/user/user-profile-slice';
import httpAxiosService from '../../lib/helpers/axiosService';
import Button from '../form/Button';
import StyledIcon from '../icons/StyledIcon';

type Props = {
	closeModal: () => void;
};

const MAX_SIZE = 1024 * 400;
const FILE_TYPE = ['image/png', 'image/jpeg'];

type PreviewType = {
	fileName: string;
	src: string;
	error: string;
};

const UpdateProfilePic = ({ closeModal }: Props) => {
	const { token } = useAppSelector(state => state.userAuth);
	const dispatchApp = useAppDispatch();
	const [preview, setPreview] = useState<PreviewType | null>(null);
	const [imgFile, setImgFile] = useState<File>();
	const [isSubmiting, setIsSubmiting] = useState(false);
	const inputFileRef = useRef<HTMLInputElement>(null);

	const handlePreviewPic = async (evt: ChangeEvent<HTMLInputElement>) => {
		let file = evt.target.files?.['0'];
		if (!file) return setPreview(null);
		if (!FILE_TYPE.includes(file.type))
			return setPreview({ src: '', fileName: '', error: 'Only PNG/JPG' });
		if (file.size > MAX_SIZE)
			return setPreview({ src: '', fileName: '', error: 'IMG to large (max 400Kb)' });
		setImgFile(file);
		try {
			const resultImg = await imgReader(file);
			setPreview({ src: resultImg, fileName: file.name, error: '' });
		} catch (error: any) {
			setPreview({ src: '', fileName: '', error });
		}
	};

	const handleSavePic = async () => {
		setIsSubmiting(true);
		if (!imgFile) return;
		const formdata = new FormData();
		formdata.append('file', imgFile);
		let formImg = true;
		const response = await httpAxiosService(token, formImg).post('/userpriv/upload', formdata);
		if (response.status === 200) {
			dispatchApp(updatePicHeader(response.data.urlImg));
			dispatchApp(updateProfPicture(response.data.urlImg));
			setImgFile(undefined);
			setIsSubmiting(false);
		}
	};

	let showMessage = msgAndName(preview);

	return (
		<div className='relative flex flex-col gap-4 rounded-lg bg-slate-100 p-4'>
			<div className='text-center text-lg font-semibold'>Update profile picture</div>
			<StyledIcon
				icon={HiXMark}
				onClick={closeModal}
				size='1.5rem'
				className='absolute right-3 top-3 cursor-pointer rounded-full bg-slate-200 p-1 hover:bg-slate-300'
			/>
			<div className='relative mx-auto'>
				<div className='h-[250px] w-[250px] border'>
					<div className='absolute left-0 top-0 flex h-[250px] w-[250px] items-center justify-center text-slate-600'>
						{preview?.src && (
							<img
								src={preview?.src}
								className='absolute z-10 h-[250px] w-[250px] object-cover opacity-60'
							/>
						)}
						{imgPreview(preview)}
					</div>
				</div>
				<input
					ref={inputFileRef}
					onChange={handlePreviewPic}
					type='file'
					name='file'
					accept={FILE_TYPE.join(', ')}
					className='invisible absolute appearance-none'
				/>
			</div>
			{showMessage}
			<div className='flex justify-center gap-4'>
				<Button
					onClick={() => inputFileRef.current?.click()}
					className='flex items-center gap-2 bg-blue-500 text-white hover:opacity-80'
				>
					<StyledIcon icon={AiOutlinePlus} />
					<span>Upload photo</span>
				</Button>
				<Button
					onClick={() => handleSavePic()}
					disabled={isSubmiting || !preview?.fileName}
					className='bg-slate-300 disabled:opacity-50'
				>
					Save
				</Button>
			</div>
		</div>
	);
};
const imgPreview = (preview: PreviewType | null) => {
	if (!preview) return <StyledIcon icon={HiOutlineUserCircle} size='14rem' stroke='stroke-[1]' />;
	if (!preview.src)
		return <StyledIcon icon={HiOutlineUserCircle} size='14rem' stroke='stroke-[1]' />;
	return (
		<img
			src={preview.src}
			alt={preview.fileName}
			className='absolute h-[250px] w-[250px] rounded-full object-cover'
		/>
	);
};

const msgAndName = (preview: PreviewType | null) => {
	if (!preview) return <div className='text-center font-semibold italic'>JPG/PNG | Max. 400Kb</div>;
	if (preview.error)
		return <div className='text-center font-semibold italic text-red-500'>{preview.error}</div>;
	return <div className='text-center font-semibold italic text-green-700'>{preview.fileName}</div>;
};

const imgReader = (file: File): any =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => {
			resolve(reader.result);
		});
		reader.addEventListener('error', () => {
			reject("couldn't load img");
		});
		reader.addEventListener('abort', () => {
			reject('abort load img');
		});
		reader.readAsDataURL(file);
	});

export default UpdateProfilePic;
