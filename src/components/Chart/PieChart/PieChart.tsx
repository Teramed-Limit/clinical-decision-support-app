import { useState } from 'react';

import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';

import { ChartData, ChartDataFilter } from '../../../types/chart-data';
import ChartFilter from '../ChartFilter/ChartFilter';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919', '#19FFC5', '#C5FF19', '#1919FF'];

const renderActiveShape = (props: {
	cx: any;
	cy: any;
	midAngle: any;
	innerRadius: any;
	outerRadius: any;
	startAngle: any;
	endAngle: any;
	fill: any;
	payload: ChartData;
	percent: any;
	value: any;
}) => {
	const RADIAN = Math.PI / 180;
	const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 0) * cos;
	const sy = cy + (outerRadius + 0) * sin;
	const mx = cx + (outerRadius + 30) * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 12;
	const ey = my;
	const textAnchor = cos >= 0 ? 'start' : 'end';

	return (
		<g>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			<path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
			<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
			<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fontSize="16px" fill="#333">
				{`${payload.key}`}
			</text>
			<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={16} textAnchor={textAnchor} fontSize="16px" fill="#999">
				{`(${(percent * 100).toFixed(2)}%)`}
			</text>
		</g>
	);
};

interface Props<T> {
	data: T[];
	filter?: boolean;
}

function PieChartComp<T extends ChartData>({ data = [], filter = false }: Props<T>) {
	const [rawData, setRawData] = useState<ChartDataFilter[]>(
		data.map((d) => ({
			...d,
			visible: true,
		})),
	);

	// 過濾掉不可見的資料值
	const filteredData = rawData.filter((d) => d.visible);

	return (
		<>
			{/* 創建一個包含 checkbox 的水平 Stack，以控制資料值的顯示 */}
			{filter && <ChartFilter data={rawData} onDataChange={setRawData} />}
			<ResponsiveContainer>
				<PieChart>
					<Pie
						data={filteredData}
						dataKey="value"
						nameKey="key"
						minAngle={0.1}
						paddingAngle={15}
						innerRadius="40%"
						outerRadius="70%"
						fill="#82ca9d"
						animationDuration={400}
						label={renderActiveShape}
					>
						{filteredData.map((entry, index) => (
							<Cell key={entry.key} fill={COLORS[index % COLORS.length]} />
						))}
					</Pie>
				</PieChart>
			</ResponsiveContainer>
		</>
	);
}

export default PieChartComp;
