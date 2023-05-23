import CheckboxEdit from './CheckboxEdit/CheckboxEdit';
import DateRangeSelector from './DateRangePicker/DateRangeSelector';
import NumberEdit from './NumberEdit/NumberEdit';
import TextareaEdit from './TextareaEdit/TextareaEdit';
import TextEdit from './TextEdit/TextEdit';
import { FieldTypes } from '../../../types/query-field';

export const EditorMapper: { [key in FieldTypes]?: any } = {
	Text: TextEdit,
	Number: NumberEdit,
	Textarea: TextareaEdit,
	DataRange: DateRangeSelector,
	Checkbox: CheckboxEdit,
};

export const EditorDefaultValue: { [key in FieldTypes]?: any } = {
	Text: '',
	Number: 0,
	Textarea: '',
	DataRange: '',
	Checkbox: '',
};
