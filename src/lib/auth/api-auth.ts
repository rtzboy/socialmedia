import axios from 'axios';
import { LoginType } from '../../pages/Login/Login';

const BASE_URL = 'http://localhost:4002/api';

const loginCall = async (userForm: LoginType) => {
	try {
		const response = await axios.post(BASE_URL + '/user/login', userForm);
		const { success, email, token, username } = response.data;
		if (response.status === 200) {
			return { success, email, token, username };
		}
		return { success: false, error: 'Something went wrong!' };
	} catch (error: any) {
		return { success: false, error: error.response.data.error };
	}
};

export { loginCall };
