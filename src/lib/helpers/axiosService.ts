import axios, { AxiosInstance } from 'axios';

const httpAxiosService = (authToken?: string, formFile?: boolean): AxiosInstance => {
	const httpAxiosInstance = axios.create({
		baseURL: 'http://localhost:4002/api',
		timeout: 2500,
		headers: authToken ? { Authorization: `Bearer ${authToken}` } : {}
	});

	if (formFile) httpAxiosInstance.defaults.headers.post['Content-Type'] = 'multipart/form-data';

	return httpAxiosInstance;
};

export default httpAxiosService;
