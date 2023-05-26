import { useCallback, useEffect } from 'react';

import InfoIcon from '@mui/icons-material/Info';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { GetRowIdParams } from 'ag-grid-community';
import { format } from 'date-fns';

import ConditionQuerier from '../../components/ConditonQuerier/ConditionQuerier';
import GridTable from '../../components/GridTable/GridTable';
import { dbQueryField } from '../../constant/grid-column-define';
import { useGridState } from '../../hooks/useGridState';
import useLocalStorage from '../../hooks/useLocalStorage';
import { ResultQueryData } from '../../types/result-query-data';
import { ResultQueryParams, ResultQueryParamsOrigin } from '../../types/result-query-params';
import { get } from '../../utils/api/api';
import { formatToDate } from '../../utils/date-utils';

const defaultQueryPairData: ResultQueryParamsOrigin = {
	studyStartDate: new Date(),
	studyEndDate: new Date(),
};

// 將原本的 ResultQueryParamsOrigin 物件轉換成 ResultQueryParams 物件
function convertParams(originParams: ResultQueryParamsOrigin): ResultQueryParams {
	return {
		patientId: originParams.patientId,
		patientsName: originParams.patientsName,
		studyStartDate: format(formatToDate(originParams?.studyStartDate), 'yyyyMMdd'),
		studyEndDate: format(formatToDate(originParams?.studyEndDate), 'yyyyMMdd'),
	};
}

function Home() {
	// AG-Grid 狀態
	const { rowData, setRowData, colDefs, gridReady, gridApiRef } = useGridState<ResultQueryData>();

	// Query 狀態
	const [queryPairData, setQueryPairData] = useLocalStorage<ResultQueryParamsOrigin>(
		'queryPairData',
		defaultQueryPairData,
	);

	// 獲取數據
	const onQuery = useCallback(
		(queryParamsOrigin: ResultQueryParamsOrigin) => {
			const queryParams = convertParams(queryParamsOrigin);
			gridApiRef.current?.showLoadingOverlay();
			get<ResultQueryData[], ResultQueryParams>('/api/query', queryParams)
				.then((res) => {
					setRowData(res);
					gridApiRef.current?.deselectAll();
					gridApiRef.current?.hideOverlay();
				})
				.catch((err) => {
					gridApiRef.current?.hideOverlay();
					console.error(err);
				});
		},
		[gridApiRef, setRowData],
	);

	const onValueChanged = (value: any, fieldId: string) => {
		setQueryPairData((data) => ({
			...data,
			[fieldId]: value,
		}));
	};

	const getRowNodeId = (params: GetRowIdParams<ResultQueryData>) => {
		return params.data.studyInstanceUID;
	};

	useEffect(
		() => onQuery(queryPairData),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);

	return (
		<Stack p={2} spacing={1} height="100%">
			<Stack direction="row" spacing="2px" alignItems="center">
				<InfoIcon color="warning" />
				<Typography variant="subtitle2" component="span">
					Use the &rdquo;%&rdquo; symbol to indicate the prefix or suffix of a fuzzy query.
				</Typography>
			</Stack>
			<ConditionQuerier
				fields={dbQueryField}
				queryPairData={queryPairData}
				onQuery={() => onQuery(queryPairData)}
				onQueryPairDataChanged={onValueChanged}
			/>
			<Stack spacing={2} height="100%" className="ag-theme-alpine">
				<GridTable
					pagination
					checkboxSelect={false}
					rowSelection="single"
					columnDefs={colDefs}
					rowData={rowData}
					gridReady={gridReady}
					getRowId={getRowNodeId}
				/>
			</Stack>
		</Stack>
	);
}

export default Home;
