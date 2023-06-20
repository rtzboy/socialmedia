import httpAxiosService from '../../helpers/axiosService';

const makePost = async (
	postStr: string,
	token: string
): Promise<{ success: boolean; message: string }> => {
	try {
		const response = await httpAxiosService().post(
			'/posts/create',
			{
				content: postStr
			},
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return { success: response.data.success, message: response.data.message };
	} catch (err: any) {
		let errMsg = '';
		if (err.message === 'timeout of 1500ms exceeded') errMsg = 'Network error try again later';
		return { success: false, message: errMsg || err.message };
	}
};

const getNewFeeds = async (token: string) => {
	try {
		const response = await httpAxiosService().get('/posts/feed', {
			headers: { Authorization: `Bearer ${token}` }
		});
		if (response.status === 200) {
			return { success: true, feeds: response.data.feeds };
		}
		if (response.status === 204) {
			return { success: false, feeds: null, msg: 'Not following anyone' };
		}
		return { success: false, feeds: null, msg: 'Someting wrong happened!' };
	} catch (err: any) {
		return { success: false, msg: err.message };
	}
};

export { getNewFeeds, makePost };
