import * as R from 'ramda';

export const coerceArray = (ary: string | any[]) => {
	if (Array.isArray(ary)) {
		return ary;
	}
	return [ary];
};

export const trim = (str: string) => str.replace(/^\s+|\s+$/gm, '');

export const isEmptyOrNil = (value: any) => {
	return R.isEmpty(value) || R.isNil(value);
};
