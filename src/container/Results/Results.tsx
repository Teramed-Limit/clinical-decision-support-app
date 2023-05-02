import { Box } from '@mui/material';

import BarChartComp from '../../components/Chart/BarChart/BarChart';
import PieChartComp from '../../components/Chart/PieChart/PieChart';
import RadarChartComp from '../../components/Chart/RadarChart/RadarChart';
import ChartLayout from '../ChartLayout/ChartLayout';

function Results() {
	return (
		<Box display="flex" flexDirection="column" overflow-y="auto" height="calc(100vh - 64px)">
			<ChartLayout title="Classification">
				<PieChartComp />
			</ChartLayout>
			<ChartLayout title="Similar Cases">
				<RadarChartComp />
			</ChartLayout>
			<ChartLayout title="Feature Importance">
				<BarChartComp />
			</ChartLayout>
		</Box>
	);
}

export default Results;
