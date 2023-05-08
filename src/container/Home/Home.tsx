import { useEffect } from 'react';

import Stack from '@mui/material/Stack';

import GridTable from '../../components/GridTable/GridTable';
import { useGridState } from '../../hooks/useGridState';
import { ResultQueryData } from '../../types/result-query-data';
import { get } from '../../utils/api/api';

function Home() {
	// AG-Grid 狀態
	const { rowData, setRowData, colDefs, gridReady } = useGridState<ResultQueryData>();

	// 獲取數據
	useEffect(() => {
		get<ResultQueryData[]>('/api/query')
			.then((res) => {
				setRowData(res);
			})
			.catch((err) => {
				console.error(err);
				// 處理錯誤
			});
	}, [setRowData]);

	return (
		<Stack p={2} spacing={1} height="100%" className="ag-theme-alpine">
			<Stack spacing={2} height="100%" className="ag-theme-alpine">
				<GridTable
					pagination
					checkboxSelect={false}
					rowSelection="single"
					columnDefs={colDefs}
					rowData={rowData}
					gridReady={gridReady}
				/>
			</Stack>
		</Stack>
	);
}

export default Home;
