import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { FormField } from '../../../../types/query-field';

interface Props {
	field: FormField;
	value: number;
	readOnly?: boolean;
	onValueChanged: (value: number, fieldId: string) => void;
}

function CheckboxEdit({ field, value, onValueChanged, readOnly = false }: Props) {
	return (
		<FormControlLabel
			sx={{ margin: '0px' }}
			control={
				<Checkbox
					size="small"
					disabled={readOnly}
					checked={value === 1}
					onChange={(e) => {
						onValueChanged(e.target.checked ? 1 : 0, field.id);
					}}
				/>
			}
			label={field.label}
		/>
	);
}

export default CheckboxEdit;
