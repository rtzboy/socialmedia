import axios, { AxiosInstance } from 'axios';

const httpAxiosService = (): AxiosInstance => {
	const httpAxiosInstance = axios.create({
		baseURL: 'http://localhost:4002/api',
		timeout: 1500
	});
	return httpAxiosInstance;
};

export default httpAxiosService;
