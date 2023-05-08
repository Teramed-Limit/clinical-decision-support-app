import { useCallback, useRef, useState } from 'react';

import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ICellRendererParams } from 'ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer';

import { define } from '../constant/grid-column-define';

export const useGridState = <T,>() => {
	const [rowData, setRowData] = useState<T[]>([]);
	const [colDefs, setColDefs] = useState<ColDef[]>(define.main.colDef);
	const gridApiRef = useRef<GridApi | null>(null);
	const columnApiRef = useRef<ColumnApi | null>(null);

	// 宣告 gridReady 函式，用來在 grid 初始化後設置 gridApi 和 columnApi 的參考
	const gridReady = (params: GridReadyEvent) => {
		gridApiRef.current = params.api;
		columnApiRef.current = params.columnApi;
	};

	// 動態更新 colDefs onClick事件
	const dispatchCellEvent = useCallback(
		(targetColDefs: ColDef[], fieldId: string, clickEvent: (params: ICellRendererParams) => void): ColDef[] => {
			const foundColDef = targetColDefs.find((col) => col.field === fieldId);
			if (foundColDef === undefined) {
				return targetColDefs;
			}

			foundColDef.cellRendererParams.onClick = clickEvent;
			return targetColDefs;
		},
		[],
	);

	// 動態更新 colDefs cellVisibility
	const assignCellVisibility = useCallback(
		(targetColDefs: ColDef[], fieldId: string, checkAvailable: (compareId: string) => boolean): ColDef[] => {
			const foundColDef = targetColDefs.find((col) => col.field === fieldId);
			if (foundColDef === undefined || foundColDef.colId === undefined) {
				return targetColDefs;
			}

			foundColDef.hide = !checkAvailable(foundColDef.colId);
			return targetColDefs;
		},
		[],
	);

	return {
		rowData,
		setRowData,
		colDefs,
		setColDefs,
		dispatchCellEvent,
		gridApiRef,
		columnApiRef,
		gridReady,
		assignCellVisibility,
	};
};
