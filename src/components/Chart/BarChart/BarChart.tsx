import { useState } from 'react';

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { ChartData, ChartDataFilter } from '../../../types/chart-data';
import ChartFilter from '../ChartFilter/ChartFilter';

interface Props {
	data: ChartData[];
	filter?: boolean;
}

function BarChartComp({ data = [], filter = false }: Props) {
	const [rawData, setRawData] = useState<ChartDataFilter[]>(data.map((d) => ({ ...d, visible: true })));

	// 過濾掉不可見的資料值
	const filteredData = rawData.filter((d) => d.visible);

	return (
		<>
			{/* 創建一個包含 checkbox 的水平 Stack，以控制資料值的顯示 */}
			{filter && <ChartFilter data={rawData} onDataChange={setRawData} />}
			<ResponsiveContainer>
				<BarChart
					data={filteredData}
					layout="vertical"
					margin={{
						top: 5,
						right: 30,
						left: 230,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis type="number" />
					<YAxis type="category" dataKey="key" />
					<Tooltip />
					<Legend />
					<Bar dataKey="value" fill="#8884d8" />
				</BarChart>
			</ResponsiveContainer>
		</>
	);
}

export default BarChartComp;
