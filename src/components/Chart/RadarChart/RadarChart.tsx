import { useState } from 'react';

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';

import { ChartData, ChartDataFilter } from '../../../types/chart-data';
import ChartFilter from '../ChartFilter/ChartFilter';

interface Props {
	data: ChartData[];
	filter?: boolean;
}

function RadarChartComp({ data = [], filter = false }: Props) {
	const [rawData, setRawData] = useState<ChartDataFilter[]>(data.map((d) => ({ ...d, visible: true })));

	// 過濾掉不可見的資料值
	const filteredData = rawData.filter((d) => d.visible);

	return (
		<>
			{/* 創建一個包含 checkbox 的水平 Stack，以控制資料值的顯示 */}
			{filter && <ChartFilter data={rawData} onDataChange={setRawData} />}
			{/* 使用 ResponsiveContainer 使雷達圖自動適應容器大小 */}
			<ResponsiveContainer>
				<RadarChart data={filteredData}>
					<PolarGrid />
					<PolarAngleAxis dataKey="key" />
					<Radar dataKey="value" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} />
					<Tooltip />
				</RadarChart>
			</ResponsiveContainer>
		</>
	);
}

export default RadarChartComp;
