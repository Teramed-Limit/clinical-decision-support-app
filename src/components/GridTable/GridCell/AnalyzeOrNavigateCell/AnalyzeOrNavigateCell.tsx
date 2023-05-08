import { useCallback } from 'react';

import { Box, Button, Link } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer';
import { useNavigate } from 'react-router-dom';

import { StudyStatus } from '../../../../types/enums/study-status';
import { ResultQueryData } from '../../../../types/result-query-data';
import { StartAnalyzePostData } from '../../../../types/start-analyze-post-data';
import { post } from '../../../../utils/api/api';

function AnalyzeOrNavigateCell(params: ICellRendererParams<ResultQueryData>) {
	const navigate = useNavigate();

	// 導頁事件
	const handleNavigateToResult = useCallback(() => {
		navigate(`/results/seriesKey/${params.data?.series_key}`);
	}, [navigate, params.data]);

	// 開始分析
	const handleAnalyze = useCallback(() => {
		if (params.data === undefined) return;
		post<undefined, StartAnalyzePostData>(`/api/startAnalyze/seriesKey/${params.data?.series_key}`, {
			patient_key: params.data?.patient_key,
			patient_id: params.data?.patient_id,
			study_key: params.data?.study_key,
			study_uid: params.data?.study_uid,
			series_key: params.data?.series_key,
			series_uid: params.data?.series_uid,
		})
			.then(() => {})
			.catch((err) => {
				console.error(err);
			});
	}, [params.data]);

	// 根據Status渲染元件
	const renderComponent = () => {
		if (params.data?.status_code === StudyStatus.Success)
			return (
				// eslint-disable-next-line jsx-a11y/anchor-is-valid
				<Link
					sx={{
						color: '#256fc7',
						textDecorationColor: '#256fc7',
						textDecoration: 'underline',
					}}
					component="button"
					variant="body2"
					onClick={(event) => {
						event.stopPropagation();
						handleNavigateToResult();
					}}
				>
					Analysis Result
				</Link>
			);

		if (params.data?.status_code === StudyStatus.Ready) {
			return (
				<Button fullWidth variant="contained" onClick={handleAnalyze}>
					Start Analyze
				</Button>
			);
		}

		return null;
	};

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '100%',
			}}
		>
			{renderComponent()}
		</Box>
	);
}

export default AnalyzeOrNavigateCell;
