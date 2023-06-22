import axios, { AxiosInstance } from 'axios';

const httpAxiosService = (authToken?: string): AxiosInstance => {
	const httpAxiosInstance = axios.create({
		baseURL: 'http://localhost:4002/api',
		timeout: 1500,
		headers: authToken ? { Authorization: `Bearer ${authToken}` } : {}
	});
	return httpAxiosInstance;
};

export default httpAxiosService;
