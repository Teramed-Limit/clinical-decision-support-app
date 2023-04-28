import { Box, Chip } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer';

interface Props extends ICellRendererParams {
	value: string[];
}

function ChipCell(props: Props) {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				height: '100%',
			}}
		>
			{props.value?.map((label) => (
				<Box key={label} sx={{ mr: '2px', display: 'flex', alignItems: 'center ' }}>
					<Chip size="small" label={label} />
				</Box>
			))}
		</Box>
	);
}

export default ChipCell;
