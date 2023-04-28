import { useCallback, useEffect, useRef, useState } from 'react';

import { Box } from '@mui/material';
import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ICellRendererParams } from 'ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer';
import { useNavigate } from 'react-router-dom';

import GridTable from '../../components/GridTable/GridTable';
import { define } from '../../constant/grid-column-define';
import { useGridColDef } from '../../hooks/useGridColDef';

// import classes from "./Home.module.scss";

const mockData = [
	{
		patientId: 'P001',
		patientsName: '王小明',
		uploadDateTime: '20220101',
		examDate: '20220315',
		age: '25',
		gender: '男',
		startDateTime: '20220315120000',
		endDateTime: '20220315124500',
		errorDateTime: '20220316133000',
		result: 'Link',
	},
	{
		patientId: 'P002',
		patientsName: '陳美麗',
		uploadDateTime: '20220105',
		examDate: '20220228',
		age: '30',
		gender: '女',
		startDateTime: '20220228143000',
		endDateTime: '20220228150000',
		errorDateTime: '20220228150500',
		result: 'Link',
	},
	{
		patientId: 'P003',
		patientsName: '張志強',
		uploadDateTime: '20220112',
		examDate: '20220210',
		age: '40',
		gender: '男',
		startDateTime: '20220210103000',
		endDateTime: '20220210110000',
		errorDateTime: '',
		result: 'Link',
	},
	{
		patientId: 'P004',
		patientsName: '林惠芳',
		uploadDateTime: '20220201',
		examDate: '20220330',
		age: '50',
		gender: '女',
		startDateTime: '20220330120000',
		endDateTime: '20220330124500',
		errorDateTime: '20220331133000',
		result: 'Link',
	},
	{
		patientId: 'P005',
		patientsName: '吳宏偉',
		uploadDateTime: '20220222',
		examDate: '20220401',
		age: '45',
		gender: '男',
		startDateTime: '20220401110000',
		endDateTime: '20220401113000',
		errorDateTime: '',
		result: 'Link',
	},
];

function Home() {
	const navigate = useNavigate();
	const [rowData, setRowData] = useState(mockData);
	const [colDefs, setColDefs] = useState<ColDef[]>(define.main.colDef);
	const { dispatchCellEvent } = useGridColDef();
	const gridApiRef = useRef<GridApi | null>(null);
	const columnApiRef = useRef<ColumnApi | null>(null);

	const gridReady = (params: GridReadyEvent) => {
		gridApiRef.current = params.api;
		columnApiRef.current = params.columnApi;
	};

	const handleButtonClick = useCallback(
		(params: ICellRendererParams) => {
			console.log(params);
			navigate(`/reporting/history/studyInstanceUID`);
		},
		[navigate],
	);

	useEffect(() => {
		setRowData(mockData);
	}, []);

	useEffect(() => {
		let mutateColDef: ColDef[] = [...define.main.colDef];
		mutateColDef = dispatchCellEvent(mutateColDef, 'result', handleButtonClick);
		setColDefs(mutateColDef);
	}, [dispatchCellEvent, handleButtonClick]);

	return (
		<Box p={2} height="100%" className="ag-theme-alpine">
			<GridTable
				pagination
				checkboxSelect={false}
				rowSelection="single"
				columnDefs={colDefs}
				rowData={rowData}
				gridReady={gridReady}
			/>
		</Box>
	);
}

export default Home;
