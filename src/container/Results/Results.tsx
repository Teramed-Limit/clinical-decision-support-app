import React, { useEffect, useState } from 'react';

import { Box, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import 'react-circular-progressbar/dist/styles.css';
import classes from './Results.module.scss';
import BarChartComp from '../../components/Chart/BarChart/BarChart';
import PieChartComp from '../../components/Chart/PieChart/PieChart';
import RadarChartComp from '../../components/Chart/RadarChart/RadarChart';
import CircularProgressBar from '../../components/CircularProgressBar/CircularProgressBar';
import OverlapImage from '../../components/OverlapImage/OverlapImage';
import ResultHeader, { headerInfoHeight } from '../../components/ResultHeader/ResultHeader';
import { atomNotification } from '../../recoil/atoms/notification';
import { AnalysisResult } from '../../types/analysis-result';
import { MessageType } from '../../types/notification';
import { get } from '../../utils/api/api';
import ChartLayout from '../ChartLayout/ChartLayout';

type GridItemProps = {
	title: string;
	children?: React.ReactNode;
};

function Item({ title, children }: GridItemProps) {
	return (
		<Stack direction="column" width="50%" height="50%" p="2px">
			<Typography textAlign="center" variant="h4">
				{title}
			</Typography>
			{children}
		</Stack>
	);
}

const appbarHeight = 64;

function Results() {
	const setNotification = useSetRecoilState(atomNotification);
	const navigate = useNavigate();

	const { studyInstanceUid } = useParams();
	const [analysisResult, setAnalysisResult] = useState<AnalysisResult>();

	// 獲取數據
	useEffect(() => {
		get<AnalysisResult>(`/api/result/studyInstanceUid/${studyInstanceUid}`)
			.then((res) => {
				setAnalysisResult(res);
			})
			.catch(() => {
				navigate('/');
				setNotification({
					messageType: MessageType.Error,
					message: 'Failed to load result',
				});
			});
	}, [navigate, setNotification, studyInstanceUid]);

	return analysisResult ? (
		<Box display="flex" flexDirection="column" overflow-y="auto" height={`calc(100vh - ${appbarHeight}px)`}>
			{/* Header */}
			<ResultHeader />
			{/* Image */}
			<Stack
				direction="row"
				p={1}
				flexWrap="wrap"
				sx={{ height: `calc(100% - ${headerInfoHeight}px)`, minHeight: `calc(100% - ${headerInfoHeight}px)` }}
			>
				<Item title="Segmentation">
					<div className={classes.imageContainer}>
						<img className={classes.image} src={analysisResult.segmentationPath} alt="" />
					</div>
				</Item>
				<Item title="Saliency Map">
					<div className={classes.imageContainer}>
						<img className={classes.image} src={analysisResult.saliencyMapPath} alt="" />
					</div>
				</Item>
				<Item title="Overlap">
					<OverlapImage
						images={[analysisResult.segmentationPath, analysisResult.saliencyMapPath]}
						opacityData={[
							{ label: 'Segmentation', opacity: 1 },
							{ label: 'Saliency Map', opacity: 0.5 },
						]}
					/>
				</Item>
				<Item title="Classification">
					<PieChartComp data={analysisResult.confidence} />
				</Item>
			</Stack>
			{/* Chart */}
			<ChartLayout title="Similar Cases">
				<RadarChartComp filter data={analysisResult.similarCases} />
			</ChartLayout>
			<ChartLayout title="Feature Importance">
				<BarChartComp data={analysisResult.featureImportance} />
			</ChartLayout>
			{/*	Metastasis Prediction */}
			<ChartLayout title="Clinical Outcome">
				<CircularProgressBar
					title="Metastasis happens in a chance of"
					value={analysisResult?.metastasisPrediction}
				/>
			</ChartLayout>
		</Box>
	) : (
		<Box />
	);
}

export default Results;
