import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { Environment } from '../../types/environment';

let instance: AxiosInstance | null = null;

export const fetchAppConfig = async (): Promise<void> => {
	try {
		const response = await axios.get('/config.json');
		const config: Environment = response.data;

		if (!config) {
			instance = axios;
		} else {
			instance = axios.create({ baseURL: config.ip_address });
		}
	} catch (error) {
		console.error('Error fetching config:', error);
		instance = axios;
	}
};

const request = async <T, D = any>(method: string, url: string, data?: D) => {
	if (!instance) {
		throw new Error('Instance not created yet');
	}

	const response: AxiosResponse<T> = await instance({
		method,
		url,
		data,
	});

	return response.data;
};

export const get = <T = any, D = any>(url: string, params?: D) => request<T, D>('get', url, params);

export const post = <T = any, D = any>(url: string, data?: D) => request<T, D>('post', url, data);

export const put = <T = any, D = any>(url: string, data?: D) => request<T, D>('put', url, data);

export const del = <T = any, D = any>(url: string, data?: D) => request<T, D>('delete', url, data);
