import { ICellRendererParams } from 'ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer';

function CheckboxCell(prop: ICellRendererParams) {
	return <input readOnly type="checkbox" checked={prop.value === 1} />;
}

export default CheckboxCell;
