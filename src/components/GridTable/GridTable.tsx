import { ChangeEvent, useCallback, useMemo, useRef } from 'react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Stack from '@mui/material/Stack';
import { ColDef, ColumnApi, FilterChangedEvent, GetRowIdFunc, GridApi, GridReadyEvent } from 'ag-grid-community';
import { IRowNode } from 'ag-grid-community/dist/lib/interfaces/iRowNode';
import { AgGridReact } from 'ag-grid-react';

import { CellMapper } from './GridCell/cell-mapper';
import classes from './GridTable.module.scss';

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
	const columnApi = useRef<ColumnApi | null>(null);

	const defaultColDef = useMemo<ColDef>(() => {
		return {
			sortable: true,
			resizable: true,
			floatingFilter: false,
			filter: null,
		};
	}, []);

	const onGridReady = (params: GridReadyEvent<T>) => {
		gridApi.current = params.api;
		columnApi.current = params.columnApi;
		gridReady?.(params);
		gridApi.current?.paginationSetPageSize(10);
	};

	const onPageSizeChanged = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
		gridApi.current?.paginationSetPageSize(Number(event.target.value));
	}, []);

	return (
		<>
			<AgGridReact
				containerStyle={{ height: 'calc(100% - 19px)', width: '100%' }}
				domLayout={domLayout}
				defaultColDef={defaultColDef}
				isExternalFilterPresent={isExternalFilterPresent}
				doesExternalFilterPass={filterRowFunction}
				onGridReady={onGridReady}
				rowData={rowData}
				columnDefs={columnDefs}
				pagination={pagination}
				paginationAutoPageSize={pagination}
				rowMultiSelectWithClick={checkboxSelect}
				rowSelection={rowSelection}
				onFirstDataRendered={(event) => (onFirstDataRendered ? onFirstDataRendered(event.api) : null)}
				onSelectionChanged={(event) => (onSelectionChanged ? onSelectionChanged(event.api) : null)}
				getRowId={getRowId}
				components={{ ...CellMapper }}
				tooltipShowDelay={0}
				onFilterChanged={(e) => onFilterChanged?.(e)}
			/>
			{/* Pagination enabled */}
			{pagination && (
				<Stack spacing={1} direction="row" className={classes.pageFooter}>
					{/* Page Size: */}
					<span>Page Size:</span>
					<select defaultValue="10" onChange={onPageSizeChanged}>
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="50">50</option>
						<option value="100">100</option>
						<option value="200">200</option>
					</select>
				</Stack>
			)}
		</>
	);
}

export default GridTable;
