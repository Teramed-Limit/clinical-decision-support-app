import { ColDef, ValueFormatterParams } from 'ag-grid-community';

import { StudyStatus } from '../types/enums/study-status';
import { dateFilterParams } from '../utils/ag-grid-utils';
import { convertToDate, stringFormatDate } from '../utils/date-utils';

export const define = {
	main: {
		colDef: [
			{
				field: 'patient_id',
				headerName: 'Patient Id',
				width: 160,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'name',
				headerName: 'Patient Name',
				width: 160,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'upload_date_time',
				headerName: 'Upload Date',
				width: 180,
				filter: 'agDateColumnFilter',
				filterParams: dateFilterParams,
				floatingFilter: true,
				valueFormatter: (params: ValueFormatterParams) => {
					const date = stringFormatDate(params.value, 'yyyy-MM-dd HH:mm:ss');
					return convertToDate(date, 'dd-MMM-yyyy HH:mm:ss');
				},
			},
			{
				field: 'study_date',
				headerName: 'Exam Date',
				width: 140,
				filter: 'agDateColumnFilter',
				filterParams: dateFilterParams,
				floatingFilter: true,
				valueFormatter: (params: ValueFormatterParams) => {
					const date = stringFormatDate(params.value, 'yyyyMMdd');
					return convertToDate(date, 'dd-MMM-yyyy');
				},
			},
			{
				field: 'age',
				headerName: 'Age',
				width: 100,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'gender',
				headerName: 'Gender',
				width: 100,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'start_date_time',
				headerName: 'Start Date',
				width: 180,
				filter: 'agDateColumnFilter',
				filterParams: dateFilterParams,
				floatingFilter: true,
				valueFormatter: (params: ValueFormatterParams) => {
					const date = stringFormatDate(params.value, 'yyyy-MM-dd HH:mm:ss');
					return convertToDate(date, 'dd-MMM-yyyy HH:mm:ss');
				},
			},
			{
				field: 'end_date_time',
				headerName: 'End Date',
				width: 180,
				filter: 'agDateColumnFilter',
				filterParams: dateFilterParams,
				floatingFilter: true,
				valueFormatter: (params: ValueFormatterParams) => {
					const date = stringFormatDate(params.value, 'yyyy-MM-dd HH:mm:ss');
					return convertToDate(date, 'dd-MMM-yyyy HH:mm:ss');
				},
			},
			{
				field: 'description',
				headerName: 'Description',
				width: 200,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'status_code',
				headerName: 'Status',
				width: 120,
				cellRenderer: 'chipRenderer',
				pinned: 'right',
				cellRendererParams: {
					mappingValue: [
						{ value: StudyStatus.Ready, color: 'primary', variant: 'contained', label: 'Ready' },
						{ value: StudyStatus.Analyzing, color: 'warning', variant: 'contained', label: 'Analyzing' },
						{ value: StudyStatus.Success, color: 'success', variant: 'contained', label: 'Success' },
						{ value: StudyStatus.Error401, color: 'error', variant: 'contained', label: '401 Error' },
						{ value: StudyStatus.Error402, color: 'error', variant: 'contained', label: '402 Error' },
						{ value: StudyStatus.Error403, color: 'error', variant: 'contained', label: '403 Error' },
						{ value: StudyStatus.Error404, color: 'error', variant: 'contained', label: '404 Error' },
						{ value: StudyStatus.Error500, color: 'error', variant: 'contained', label: '500 Error' },
					],
				},
			},
			{
				field: 'series_key',
				headerName: 'Action',
				width: 120,
				cellStyle: { padding: '4px' },
				cellRenderer: 'analyzeOrNavigateRenderer',
				pinned: 'right',
			},
		] as ColDef[],
	},
};
