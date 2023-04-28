import { useRef } from 'react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { ColDef, FilterChangedEvent, GetRowIdFunc, GridApi, GridReadyEvent } from 'ag-grid-community';
import { IRowNode } from 'ag-grid-community/dist/lib/interfaces/iRowNode';
import { AgGridReact } from 'ag-grid-react';

import { CellMapper } from './GridCell/cell-mapper';

interface Props<T> {
	columnDefs: ColDef[];
	rowData: T[];
	pagination?: boolean;
	domLayout?: 'normal' | 'autoHeight' | 'print';
	onSelectionChanged?: (param: GridApi<T>) => void;
	onFirstDataRendered?: (param: GridApi<T>) => void;
	rowSelection?: 'single' | 'multiple';
	checkboxSelect?: boolean;
	gridReady?: (gridReadyEvent: GridReadyEvent<T>) => void;
	getRowId?: GetRowIdFunc;
	filterRowFunction?: (node: IRowNode<T>) => boolean;
	isExternalFilterPresent?: () => boolean;
	onFilterChanged?: (event: FilterChangedEvent) => void;
}

function GridTable<T = any>({
	domLayout = 'normal',
	columnDefs,
	rowData,
	pagination = false,
	onSelectionChanged,
	onFirstDataRendered,
	checkboxSelect = true,
	rowSelection = 'multiple',
	gridReady,
	getRowId,
	filterRowFunction,
	isExternalFilterPresent,
	onFilterChanged,
}: Props<T>) {
	const gridApi = useRef<GridApi<T> | null>(null);

	const onGridReady = (params: GridReadyEvent<T>) => {
		gridApi.current = params.api;
		gridReady?.(params);
	};

	return (
		<AgGridReact
			domLayout={domLayout}
			defaultColDef={{
				resizable: true,
			}}
			isExternalFilterPresent={isExternalFilterPresent}
			doesExternalFilterPass={filterRowFunction}
			onGridReady={onGridReady}
			rowData={rowData}
			columnDefs={columnDefs}
			pagination={pagination}
			rowMultiSelectWithClick={checkboxSelect}
			rowSelection={rowSelection}
			onFirstDataRendered={(event) => (onFirstDataRendered ? onFirstDataRendered(event.api) : null)}
			onSelectionChanged={(event) => (onSelectionChanged ? onSelectionChanged(event.api) : null)}
			getRowId={getRowId}
			components={{ ...CellMapper }}
			tooltipShowDelay={0}
			onFilterChanged={(e) => onFilterChanged?.(e)}
		/>
	);
}

export default GridTable;
