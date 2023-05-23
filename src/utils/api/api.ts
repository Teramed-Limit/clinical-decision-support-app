import axios, { AxiosInstance, AxiosResponse } from 'axios';

import EnvService from '../../services/EnvService';
import { Environment } from '../../types/environment';

let instance: AxiosInstance | null = null;

export const fetchAppConfig = async (): Promise<void> => {
	try {
		const response = await axios.get('/config.json');
		const config: Environment = response.data;

		EnvService.setIpAddress(config.ip_address);
		EnvService.setDateFormat(config.date_format);
		EnvService.setDateTimeFormat(config.datetime_format);

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

	// 如果method是get，那么data就是params
	const response: AxiosResponse<T> = await instance({
		method,
		url,
		data,
		params: method === 'get' ? data : undefined,
	});

	return response.data;
};

export const get = <T = any, D = any>(url: string, params?: D) => request<T, D>('get', url, params);

export const post = <T = any, D = any>(url: string, data?: D) => request<T, D>('post', url, data);

export const put = <T = any, D = any>(url: string, data?: D) => request<T, D>('put', url, data);

export const del = <T = any, D = any>(url: string, data?: D) => request<T, D>('delete', url, data);
