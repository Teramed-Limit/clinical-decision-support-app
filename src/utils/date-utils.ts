import { format, parse } from 'date-fns';

export const stringFormatDate = (value: string, fromFormat: string): Date => parse(value, fromFormat, new Date());

export const convertToDateTime = (value: string | Date, fromFormat = 'yyyyMMdd') => {
	try {
		if (value instanceof Date) {
			return format(value, fromFormat);
		}
		return format(new Date(value), fromFormat);
	} catch {
		return '';
	}
};

export const convertToDate = (value: string | Date, fromFormat = 'yyyyMMdd') => {
	try {
		if (value instanceof Date) {
			return format(value, fromFormat);
		}
		return format(new Date(value), fromFormat);
	} catch {
		return '';
	}
};
