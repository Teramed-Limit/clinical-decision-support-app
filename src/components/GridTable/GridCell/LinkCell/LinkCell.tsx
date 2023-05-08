import { Box, Link } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer';

interface Props extends ICellRendererParams {
	onClick: (params: any) => void;
	label: string;
}

function LinkCell(props: Props) {
	return (
		<Box sx={{ padding: '0 17px' }}>
			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
			<Link
				sx={{
					color: '#256fc7',
					textDecorationColor: '#256fc7',
					textDecoration: 'underline',
				}}
				component="button"
				variant="body2"
				onClick={(event) => {
					event.stopPropagation();
					props?.onClick(props);
				}}
			>
				{props?.label}
			</Link>
		</Box>
	);
}

export default LinkCell;
