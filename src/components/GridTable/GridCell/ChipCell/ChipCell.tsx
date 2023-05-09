import { Box, Chip } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer';

interface Props extends ICellRendererParams {
	value: string;
	color?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
	variant?: 'filled' | 'outlined';
	mappingValue?: {
		color: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
		variant: 'filled' | 'outlined';
		label: string;
		value: string;
	}[];
}

function ChipCell({ value, color = 'default', variant = 'filled', mappingValue }: Props) {
	let mappingLabel = value;
	let mappingColor = color;
	let mappingVariant = variant;

	if (mappingValue) {
		const mapping = mappingValue.find((item) => item?.value === value);
		if (mapping) {
			mappingColor = mapping.color;
			mappingVariant = mapping.variant;
			mappingLabel = mapping.label;
		}
	}

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				height: '100%',
			}}
		>
			<Box sx={{ mr: '2px', display: 'flex', alignItems: 'center ' }}>
				<Chip size="small" color={mappingColor} variant={mappingVariant} label={mappingLabel} />
			</Box>
		</Box>
	);
}

export default ChipCell;
