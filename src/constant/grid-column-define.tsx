import { ColDef, ValueFormatterParams } from 'ag-grid-community';

import { dateFilterParams } from '../utils/ag-grid-utils';
import { convertToDate, stringFormatDate } from '../utils/date-utils';

export const define = {
	main: {
		colDef: [
			{
				field: 'patientId',
				headerName: 'Patient Id',
				width: 160,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'patientsName',
				headerName: 'Patient Name',
				width: 160,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'uploadDateTime',
				headerName: 'Upload Date',
				width: 160,
				filter: 'agDateColumnFilter',
				filterParams: dateFilterParams,
				floatingFilter: true,
				valueFormatter: (params: ValueFormatterParams) => {
					const date = stringFormatDate(params.value, 'yyyyMMdd');
					return convertToDate(date);
				},
			},
			{
				field: 'examDate',
				headerName: 'Exam Date',
				width: 160,
				filter: 'agDateColumnFilter',
				filterParams: dateFilterParams,
				floatingFilter: true,
				valueFormatter: (params: ValueFormatterParams) => {
					const date = stringFormatDate(params.value, 'yyyyMMdd');
					return convertToDate(date);
				},
			},
			{
				field: 'age',
				headerName: 'Age',
				width: 120,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'gender',
				headerName: 'Gender',
				width: 120,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'startDateTime',
				headerName: 'Start Date',
				width: 160,
				filter: 'agDateColumnFilter',
				filterParams: dateFilterParams,
				floatingFilter: true,
				valueFormatter: (params: ValueFormatterParams) => {
					const date = stringFormatDate(params.value, 'yyyyMMdd');
					return convertToDate(date);
				},
			},
			{
				field: 'endDateTime',
				headerName: 'End Date',
				width: 160,
				filter: 'agDateColumnFilter',
				filterParams: dateFilterParams,
				floatingFilter: true,
				valueFormatter: (params: ValueFormatterParams) => {
					const date = stringFormatDate(params.value, 'yyyyMMdd');
					return convertToDate(date);
				},
			},
			{
				field: 'errorDateTime',
				headerName: 'Error Date',
				width: 160,
				filter: 'agDateColumnFilter',
				filterParams: dateFilterParams,
				floatingFilter: true,
				valueFormatter: (params: ValueFormatterParams) => {
					const date = stringFormatDate(params.value, 'yyyyMMdd');
					return convertToDate(date);
				},
			},
			{
				field: 'result',
				headerName: '',
				colId: 'navigation__result',
				width: 60,
				cellStyle: { padding: 0 },
				cellRenderer: 'linkRenderer',
				cellRendererParams: {
					onClick: () => undefined,
				},
				pinned: 'right',
			},
		] as ColDef[],
	},
};
