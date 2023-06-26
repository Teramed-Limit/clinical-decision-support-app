import React, { useEffect, useRef, useState } from 'react';

import { Box, FormControlLabel, Stack, Switch, Typography } from '@mui/material';
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
	children?: React.ReactNode;
};

function ImageItem({ children }: GridItemProps) {
	return (
		<Stack direction="column" width="33%" height="100%" p="2px">
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

	const [showHCCMetastasisPrediction, setShowHCCMetastasisPrediction] = React.useState(false);
	const elementRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		if (elementRef?.current?.parentElement) {
			const element = elementRef.current.parentElement;
			element.scrollTo({
				top: element.scrollHeight,
				behavior: 'smooth',
			});
		}
	};

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
		<Box
			ref={elementRef}
			display="flex"
			flexDirection="column"
			overflow-y="auto"
			height={`calc(100vh - ${appbarHeight}px)`}
		>
			{/* Header */}
			<ResultHeader />
			{/* Image */}
			<Stack
				direction="row"
				justifyContent="space-between"
				p={1}
				flexWrap="wrap"
				sx={{
					height: `calc(100% - ${headerInfoHeight}px)`,
					minHeight: `calc(100% - ${headerInfoHeight}px)`,
					width: '100%',
				}}
			>
				<Typography
					textAlign="center"
					variant="h4"
					component="div"
					display="inline-block"
					style={{ width: '100%' }}
				>
					Segmentation and Saliency Map
				</Typography>
				<ImageItem>
					<div className={classes.imageContainer}>
						<img className={classes.image} src={analysisResult.segmentationPath} alt="" />
					</div>
				</ImageItem>
				<ImageItem>
					<div className={classes.imageContainer}>
						<img className={classes.image} src={analysisResult.saliencyMapPath} alt="" />
					</div>
				</ImageItem>
				<ImageItem>
					<div className={classes.imageContainer}>
						<OverlapImage
							images={[analysisResult.segmentationPath, analysisResult.saliencyMapPath]}
							opacityData={[
								{ label: 'Segmentation', opacity: 1 },
								{ label: 'Saliency Map', opacity: 0.5 },
							]}
						/>
					</div>
				</ImageItem>
			</Stack>
			{/* Chart */}
			<ChartLayout title="Classification" minHeight="75%">
				<PieChartComp data={analysisResult.confidence} />
			</ChartLayout>
			<ChartLayout title="Similar Cases" minHeight="75%">
				<RadarChartComp data={analysisResult.similarCases} />
			</ChartLayout>
			<FormControlLabel
				sx={{ display: 'flex', alignSelf: 'center' }}
				label={
					<Typography variant="h4" sx={{ margin: 'auto' }}>
						HCC metastasis prediction
					</Typography>
				}
				control={
					<Switch
						checked={showHCCMetastasisPrediction}
						onChange={(event) => {
							setShowHCCMetastasisPrediction(event.target.checked);
							setTimeout(() => scrollToBottom());
						}}
					/>
				}
			/>
			{showHCCMetastasisPrediction && (
				<>
					{/* Feature Importance */}
					<ChartLayout minHeight="calc(50% - 32px)" title="Feature Importance">
						<BarChartComp data={analysisResult.featureImportance} />
					</ChartLayout>
					{/*	Metastasis Prediction */}
					<ChartLayout minHeight="calc(50% - 32px)" title="Clinical Outcome">
						<CircularProgressBar
							title="Metastasis happens in a chance of"
							value={analysisResult?.metastasisPrediction}
						/>
					</ChartLayout>
				</>
			)}
		</Box>
	) : (
		<Box />
	);
}

export default Results;
