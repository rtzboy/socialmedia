import httpAxiosService from '../../helpers/axiosService';

const userInformation = async (token: string, idParam?: string) => {
	try {
		const response = await httpAxiosService(token).get(`/userpriv/profile/${idParam}`);
		if (response.status === 200) {
			return { result: response.data.result, error: '' };
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
			return { result: response.data.resultSearch, error: 'error user search' };
		}
		return { result: null, error: 'error' };
	} catch (error) {
		return { result: null, error: 'Something went wrong' };
	}
};

export { userInformation, userSearch };
