import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { HiXMark } from 'react-icons/hi2';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateUserHeader } from '../../features/user/user-header-slice';
import { updateProfDetails } from '../../features/user/user-profile-slice';
import { updateDetails } from '../../lib/api/user/user.api';
import useEditDetails from '../../lib/hooks/useEditDetails';
import TextAreaAuto from '../TextAreaAuto';
import Button from '../form/Button';
import LoadIcon from '../icons/LoadIcon';
import StyledIcon from '../icons/StyledIcon';

type Props = {
	closeModal: () => void;
	textBio: string;
};

const UpdateDetails = ({ closeModal, textBio }: Props) => {
	const { username } = useAppSelector(state => state.userHeader);
	const dispatchApp = useAppDispatch();
	const { token } = useAppSelector(state => state.userAuth);
	const [isSubmiting, setIsSubmiting] = useState(false);
	const textBioRef = useRef<HTMLTextAreaElement>(null);

	const { checkUsername, bio, isAllOkay, setDetails } = useEditDetails(username, textBio);

	let iconState = checkUserIcon(checkUsername, username);

	const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setIsSubmiting(true);
		try {
			let userFilter = checkUsername.value.trim();
			let bioFilter = bio.trim();
			const { success } = await updateDetails(token, userFilter, bioFilter);
			if (success) {
				setIsSubmiting(false);
				dispatchApp(updateProfDetails({ username: userFilter, bio: bioFilter }));
				dispatchApp(updateUserHeader(userFilter));
				toast.success('Successfully updated!', { duration: 3000 });
			} else {
				toast.error('Something wrong happened!', { duration: 3500 });
			}
			closeModal();
		} catch (error) {
			toast.error('Something wrong happened!', { duration: 3500 });
			closeModal();
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='relative flex flex-col gap-4 rounded-lg bg-slate-100 p-4'
		>
			<StyledIcon
				icon={HiXMark}
				onClick={closeModal}
				size='1.5rem'
				className='absolute right-3 top-3 cursor-pointer rounded-full bg-slate-200 p-1 hover:bg-slate-300'
			/>
			<div className='text-center text-lg font-semibold'>Edit details</div>
			<div className='relative'>
				Username
				<div className='relative'>
					<input
						onChange={evt =>
							setDetails.setCheckUsername(prev => ({
								...prev,
								value: evt.target.value,
								loading: true
							}))
						}
						type='text'
						value={checkUsername.value}
						className='w-full rounded-lg bg-slate-200 px-2 py-1 outline-none'
					/>
					{iconState}
				</div>
				{checkUsername.error && (
					<span className='absolute -bottom-4 text-sm italic text-red-500'>
						{checkUsername.error}
					</span>
				)}
			</div>
			<div>
				Bio
				<TextAreaAuto
					className='max-h-32 rounded-lg bg-slate-200 px-2 py-1'
					contentTxt={bio}
					setContentTxt={str => {
						let limit = str.length;
						if (limit > 199) return setDetails.setBio(str.slice(0, 199));
						setDetails.setBio(str);
					}}
					textareaRef={textBioRef}
				/>
			</div>
			<div className='flex justify-center gap-4'>
				<Button className='flex-1 bg-slate-300' onClick={closeModal}>
					Cancel
				</Button>
				<Button
					disabled={isAllOkay || isSubmiting}
					className='flex-1 bg-blue-500 text-white disabled:opacity-50'
				>
					Save Updates
				</Button>
			</div>
		</form>
	);
};

const checkUserIcon = (
	checkUsername: { value: string; loading: boolean; error: string },
	username: string
) => {
	if (checkUsername.value === username) return null;
	if (checkUsername.value === '') return null;
	if (checkUsername.loading)
		return (
			<span className='absolute right-2 top-1/2 inline-block -translate-y-1/2 text-slate-700'>
				<LoadIcon className='h-6 animate-spin' />
			</span>
		);

	if (!checkUsername.error)
		return (
			<StyledIcon
				icon={AiOutlineCheckCircle}
				className='absolute right-2 top-1/2 -translate-y-1/2 text-green-600'
			/>
		);

	if (checkUsername.error)
		return (
			<StyledIcon
				icon={HiXMark}
				className='absolute right-2 top-1/2 -translate-y-1/2 text-red-600'
			/>
		);
	return null;
};

export default UpdateDetails;
