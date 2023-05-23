import React, { useEffect, useRef, useState } from 'react';

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

function TextareaEdit({ field, value, isValid, autoFocus, readOnly = false, onValueChanged }: Props) {
	const [isDirty, setDirty] = useState(false);
	const fieldLabel = field?.validation ? `${field.label} - ${field.validation}` : `${field.label}`;
	const ref = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		ref.current?.setAttribute('spellCheck', 'false');
	}, []);

	return (
		<>
			<TextField
				fullWidth
				multiline
				spellCheck={false}
				label={fieldLabel}
				disabled={readOnly}
				placeholder="Empty"
				value={value}
				autoFocus={autoFocus}
				id={field.id}
				error={!isValid && isDirty}
				onChange={(e) => {
					onValueChanged(e.target.value, field.id);
					setDirty(true);
				}}
			/>
		</>
	);
}

export default React.memo(TextareaEdit);
