import { useCallback } from 'react';

import { Box, Button, Link } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { atomNotification } from '../../../../recoil/atoms/notification';
import { StudyStatus } from '../../../../types/enums/study-status';
import { MessageType } from '../../../../types/notification';
import { ResultQueryData } from '../../../../types/result-query-data';
import { post } from '../../../../utils/api/api';

function AnalyzeOrNavigateCell(params: ICellRendererParams<ResultQueryData>) {
	const setNotification = useSetRecoilState(atomNotification);
	const navigate = useNavigate();

	// 導頁事件
	const handleNavigateToResult = useCallback(() => {
		navigate(`/results/studyInstanceUid/${params.data?.studyInstanceUID}`, { state: params.data });
	}, [navigate, params.data]);

	// 開始分析
	const handleAnalyze = useCallback(() => {
		if (params.data === undefined) return;
		post<undefined, undefined>(`/api/startAnalyze/studyInstanceUid/${params.data?.studyInstanceUID}`)
			.then(() => {})
			.catch((err) => {
				setNotification({
					messageType: MessageType.Error,
					message: err.message,
				});
			});
	}, [setNotification, params.data]);

	// 根據Status渲染元件
	const renderComponent = () => {
		if (params.data?.statusCode === StudyStatus.Success)
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

		if (params.data?.statusCode === StudyStatus.Ready) {
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
