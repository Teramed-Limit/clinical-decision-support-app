import { useCallback } from 'react';

import { ColDef } from 'ag-grid-community';
import { ICellRendererParams } from 'ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer';

export const useGridColDef = () => {
	const dispatchCellEvent = useCallback(
		(colDefs: ColDef[], fieldId: string, clickEvent: (params: ICellRendererParams) => void): ColDef[] => {
			const foundColDef = colDefs.find((col) => col.field === fieldId);
			if (foundColDef === undefined) {
				return colDefs;
			}

			foundColDef.cellRendererParams.onClick = clickEvent;
			return colDefs;
		},
		[],
	);

	const assignCellVisibility = useCallback(
		(colDefs: ColDef[], fieldId: string, checkAvailable: (compareId: string) => boolean): ColDef[] => {
			const foundColDef = colDefs.find((col) => col.field === fieldId);
			if (foundColDef === undefined || foundColDef.colId === undefined) {
				return colDefs;
			}

			foundColDef.hide = !checkAvailable(foundColDef.colId);
			return colDefs;
		},
		[],
	);

	return { dispatchCellEvent, assignCellVisibility };
};
