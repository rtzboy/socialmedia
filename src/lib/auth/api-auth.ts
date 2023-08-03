import { LoginType } from '../../pages/Login/Login';
import { SignupType } from '../../pages/Signup/Signup';
import httpAxiosService from '../helpers/axiosService';

const loginCall = async (userForm: LoginType) => {
	try {
		const response = await httpAxiosService().post('/users/login', userForm);
		const { success, id, email, token } = response.data;
		if (response.status === 200) {
			return { success, id, email, token };
		}
		return { success: false, error: 'Something went wrong!' };
	} catch (error: any) {
		return { success: false, error: error.response.data.error };
	}
};

const signupCall = async (userForm: SignupType) => {
	try {
		const response = await httpAxiosService().post('/users/signup', userForm);
		const { success, id, email, token } = response.data;
		if (response.status === 200) {
			return { success, id, email, token };
		}
		return { success: false, error: 'Something went wrong!' };
	} catch (error: any) {
		return { success: false, error: error.response.data.error };
	}
};

export { loginCall, signupCall };
