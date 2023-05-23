export interface FormField {
	type: FieldTypes;
	id: string;
	label: string;
	placeholder?: string;
	readOnly?: boolean;
	validation?: Validation;
	disabled?: boolean;
}

export interface Validation {
	type: ValidationTypes;
	params?: any;
}

export type ValidationTypes = 'Required';

export type FieldTypes = 'Text' | 'Number' | 'Textarea' | 'DataRange' | 'Checkbox';
