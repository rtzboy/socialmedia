import httpAxiosService from '../../helpers/axiosService';

const callUserHeader = async (token: string, idParam?: string) => {
	try {
		const response = await httpAxiosService(token).get(`/userpriv/header/${idParam}`);
		if (response.status === 200) {
			return { userHeader: response.data.userHeader, error: '' };
		}
		// check axios error result
		return { result: null, error: 'error' };
	} catch (error) {
		return { result: null, error: 'Something went wrong' };
	}
};

const callUpdatePic = async (token: string, formImg: boolean, formdata: FormData) => {
	try {
		const response = await httpAxiosService(token, formImg).post('/userpriv/upload', formdata);

		if (response.status !== 200) {
			return { error: true };
		}
		return { imgUrl: response.data.urlImg, error: false };
	} catch (error) {
		return { error: true };
	}
};

const userSearch = async (token: string, searchUser: string) => {
	try {
		const response = await httpAxiosService(token).get(`/userpriv/search?username=${searchUser}`);
		if (response.status === 200) {
			return { success: true, result: response.data.resultSearch, error: '' };
		}
		return { success: false, error: 'error' };
	} catch (error) {
		return { success: false, error: 'Something went wrong' };
	}
};

const userFollow = async (token: string, idParam: string, followStatus: boolean) => {
	try {
		const response = await httpAxiosService(token).patch(`/userpriv/follow/${idParam}`, {
			followStatus
		});
		if (response.status === 200) {
			return { success: true, error: false };
		}
		return { success: false, error: true };
	} catch (error) {
		return { success: false, error: true };
	}
};

const availableUsername = async (token: string, username: string) => {
	try {
		const res = await httpAxiosService(token).get(`/userpriv/checkusername?username=${username}`);
		if (res.status === 200) {
			if (res.data.isValid) {
				return { valid: res.data.isValid, error: '' };
			}
			return { valid: res.data.isValid, error: '' };
		}
		return { error: 'Something went wrong!' };
	} catch (error) {
		return { error: 'Something went wrong!' };
	}
};

const updateDetails = async (token: string, username: string, bio: string) => {
	try {
		const response = await httpAxiosService(token).patch('/userpriv/updatedetails', {
			username,
			bio
		});
		if (response.status === 200) {
			return { success: true, error: '' };
		}
		return { success: false, error: 'Something went wrong!' };
	} catch (error: any) {
		return { error: error.response.data.error };
	}
};

export { availableUsername, callUpdatePic, callUserHeader, updateDetails, userFollow, userSearch };
