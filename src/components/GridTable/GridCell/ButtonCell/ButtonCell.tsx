import { Box, Button } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer';

interface Props extends ICellRendererParams {
	onClick: (params: any) => void;
	color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
	variant: 'text' | 'outlined' | 'contained';
	label: string;
}

function ButtonCell(props: Props) {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				width: '100%',
				height: '100%',
			}}
		>
			<Button
				fullWidth
				sx={{ fontSize: '0.8125rem !important' }}
				variant={props.variant}
				color={props.color}
				onClick={() => props.onClick(props.data)}
			>
				{props.label}
			</Button>
		</Box>
	);
}

ButtonCell.displayName = 'ButtonCell';

export default ButtonCell;
