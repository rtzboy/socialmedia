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

export { callUserHeader, userFollow, userSearch };
