import { ColDef, ValueFormatterParams } from 'ag-grid-community';

import EnvService from '../services/EnvService';
import { StudyStatus } from '../types/enums/study-status';
import { FormField } from '../types/query-field';
import { ResultQueryData } from '../types/result-query-data';
import { convertToDate, stringFormatDate } from '../utils/date-utils';

export const define = {
	main: {
		colDef: [
			{
				field: 'patientId',
				headerName: 'Patient Id',
				width: 160,
			},
			{
				field: 'patientsName',
				headerName: 'Patient Name',
				width: 160,
			},
			{
				field: 'searchDateTime',
				headerName: 'Upload Date',
				width: 180,
				filter: 'agDateColumnFilter',
				valueFormatter: (params: ValueFormatterParams) => {
					if (params?.value) return convertToDate(new Date(params.value), EnvService.getDateTimeFormat());
				},
			},
			{
				field: 'studyDate',
				headerName: 'Exam Date',
				width: 140,
				valueFormatter: (params: ValueFormatterParams) => {
					const date = stringFormatDate(params.value, 'yyyyMMdd');
					return convertToDate(date, EnvService.getDateFormat());
				},
			},
			{
				field: 'patientsAge',
				headerName: 'Age',
				width: 100,
			},
			{
				field: 'patientsSex',
				headerName: 'Gender',
				width: 100,
			},
			{
				field: 'processDateTime',
				headerName: 'Start Date',
				width: 180,
				valueFormatter: (params: ValueFormatterParams) => {
					if (params?.value) return convertToDate(new Date(params.value), EnvService.getDateTimeFormat());
				},
			},
			{
				field: 'receiveDateTime',
				headerName: 'End Date',
				width: 180,
				valueFormatter: (params: ValueFormatterParams) => {
					if (params?.value) return convertToDate(new Date(params.value), EnvService.getDateTimeFormat());
				},
			},
			{
				field: 'statusDescription',
				headerName: 'Description',				
				flex: 1,
			},
			{
				field: 'statusCode',
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
				field: 'studyInstanceUID',
				headerName: 'Action',
				width: 120,
				cellStyle: { padding: '4px' },
				cellRenderer: 'analyzeOrNavigateRenderer',
				valueFormatter: (params: ValueFormatterParams<ResultQueryData>) => {
					return `${params.data?.studyInstanceUID}_${params.data?.statusCode}`;
				},
				pinned: 'right',
			},
		] as ColDef[],
	},
};

export const dbQueryField: FormField[] = [
	{ id: 'patientId', label: 'Patient ID', type: 'Text' },
	{ id: 'patientsName', label: 'Patient Name', type: 'Text' },
	{ id: 'studyStartDate', label: 'Study Start Date', type: 'DataRange' },
	{ id: 'studyEndDate', label: 'Study End Date', type: 'DataRange' },
];
