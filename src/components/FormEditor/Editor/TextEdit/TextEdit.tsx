import React, { useState } from 'react';

import { TextField } from '@mui/material';

import { FormField } from '../../../../types/query-field';

interface Props {
	field: FormField;
	value: string;
	isValid: boolean;
	autoFocus: boolean;
	readOnly?: boolean;
	onValueChanged: (value: string, fieldId: string) => void;
}

function TextEdit({ field, value, isValid, autoFocus, readOnly = false, onValueChanged }: Props) {
	const [isDirty, setDirty] = useState(false);
	const fieldLabel = field?.validation ? `${field.label} - ${field.validation}` : `${field.label}`;

	return (
		<TextField
			fullWidth
			autoFocus={autoFocus}
			disabled={readOnly}
			label={`${fieldLabel}`}
			id={field.id}
			value={value}
			onChange={(e) => {
				onValueChanged(e.target.value, field.id);
				setDirty(true);
			}}
			error={!isValid && isDirty}
			size="small"
		/>
	);
}

export default React.memo(TextEdit);
