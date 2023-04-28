import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
});

const request = <T, D = any>(method: string, url: string, data?: D) =>
	instance({
		method,
		url,
		data,
	}).then((response: AxiosResponse<T>) => response.data);

export const get = <T, D>(url: string, params?: D) => request<T, D>('get', url, params);

export const post = <T, D>(url: string, data?: D) => request<T, D>('post', url, data);

export const put = <T, D>(url: string, data?: D) => request<T, D>('put', url, data);

export const del = <T, D>(url: string, data?: D) => request<T, D>('delete', url, data);
