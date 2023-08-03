import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { availableUsername } from '../api/user/user.api';

const useEditDetails = (username: string, textBio: string) => {
	const { token } = useAppSelector(state => state.userAuth);
	const [checkUsername, setCheckUsername] = useState({
		value: username,
		loading: false,
		error: ''
	});
	const [bio, setBio] = useState(textBio);

	useEffect(() => {
		if (checkUsername.value === username) return;
		if (!checkUsername.loading) return;
		let idInterval = setTimeout(() => {
			checkAvailableUsername();
		}, 300);
		return () => {
			clearInterval(idInterval);
		};
	}, [checkUsername.loading, checkUsername.value]);

	const checkAvailableUsername = async () => {
		try {
			const { valid, error } = await availableUsername(token, checkUsername.value);
			if (valid) {
				setCheckUsername(prevState => ({ ...prevState, loading: false, error: '' }));
			} else {
				setCheckUsername(prevState => ({
					...prevState,
					loading: false,
					error: 'Username not available'
				}));
				return;
			}
			setCheckUsername(prevState => ({ ...prevState, loading: false, error }));
		} catch (error) {
			console.log('Error', error);
		}
	};

	const isAllOkay =
		(checkUsername.value === username && textBio === bio) ||
		!!checkUsername.error ||
		!checkUsername.value ||
		checkUsername.loading;

	return { checkUsername, bio, isAllOkay, setDetails: { setCheckUsername, setBio } };
};

export default useEditDetails;
