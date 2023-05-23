import SearchIcon from '@mui/icons-material/Search';
import { Box, Button } from '@mui/material';

import classes from './ConditionQuerier.module.scss';
import { FormField } from '../../types/query-field';
import { EditorDefaultValue, EditorMapper } from '../FormEditor/Editor/editorMapper';

interface Props {
	fields: FormField[];
	queryPairData: any;
	onQuery: () => void;
	onQueryPairDataChanged: (value: any, fieldId: string) => void;
}

function ConditionQuerier({ fields, queryPairData, onQuery, onQueryPairDataChanged }: Props) {
	const onValueChanged = (value: any, fieldId: string) => {
		onQueryPairDataChanged(value, fieldId);
	};

	return (
		<div className={classes.queryCondition}>
			{fields.map((field) => {
				const RenderComponent = EditorMapper[field.type];
				const value = queryPairData[field.id] || EditorDefaultValue[field.type];

				return (
					<Box key={field.id}>
						<RenderComponent field={field} value={value} isValid onValueChanged={onValueChanged} />
					</Box>
				);
			})}
			<Button startIcon={<SearchIcon />} variant="contained" onClick={onQuery}>
				Query
			</Button>
		</div>
	);
}

export default ConditionQuerier;
