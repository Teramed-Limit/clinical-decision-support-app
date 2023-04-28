import { Box, Chip } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer';

interface Props extends ICellRendererParams {
	value: string;
}

function StatusChipCell(props: Props) {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				height: '100%',
				paddingLeft: '18px',
				paddingRight: '18px',
			}}
		>
			<Chip size="small" color={props.colDef?.cellRendererParams[props.value]} label={props.value} />
		</Box>
	);
}

export default StatusChipCell;
