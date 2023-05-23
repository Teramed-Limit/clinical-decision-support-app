import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { FormField } from '../../../../types/query-field';
import { formatToDate } from '../../../../utils/date-utils';

interface Props {
	field: FormField;
	value: Date | string | null;
	autoFocus: boolean;
	readOnly?: boolean;
	onValueChanged: (value: Date, fieldId: string) => void;
}

function DateRangeSelector({ field, value, onValueChanged, autoFocus, readOnly }: Props) {
	const handleDateChange = (date: Date | null) => {
		onValueChanged(date || new Date(), field.id);
	};

	const formatValue = formatToDate(value);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DatePicker
				label={field.label}
				value={formatValue}
				autoFocus={autoFocus}
				disabled={readOnly}
				onChange={handleDateChange}
			/>
		</LocalizationProvider>
	);
}

export default DateRangeSelector;
