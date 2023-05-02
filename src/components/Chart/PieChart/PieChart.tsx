import { Cell, Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from 'recharts';

const data = [
	{ name: 'cirrhosis_only', label: 'Cirrhosis only', value: 0.02186720259487629 },
	{ name: 'cirrhosis_viral_hepatitis', label: 'Cirrhosis Viral Hepatitis', value: 0.028671493753790855 },
	{ name: 'hcc_cirrhosis', label: 'HCC & Cirrhosis', value: 0.6937018632888794 },
	{ name: 'hcc_only', label: 'HCC Only', value: 0.00402587465941906 },
	{ name: 'hcc_viral_hepatitis', label: 'HCC & Viral Hepatitis', value: 0.00014487223234027624 },
	{ name: 'hcc_viral_hepatitis_cirrhosis', label: 'HCC & Viral Cirrhosis Hepatitis', value: 0.24468663334846497 },
	{ name: 'normal_liver', label: 'Normal Liver', value: 1.4341027963382658e-5 },
	{ name: 'viral_hepatitis_only', label: 'Viral Hepatitis only', value: 0.006887716706842184 },
];

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
	payload: any;
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
				{`${payload.label}`}
			</text>
			<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={16} textAnchor={textAnchor} fontSize="16px" fill="#999">
				{`(${(percent * 100).toFixed(2)}%)`}
			</text>
		</g>
	);
};

function PieChartComp() {
	return (
		<ResponsiveContainer>
			<PieChart>
				<Pie
					data={data}
					dataKey="value"
					nameKey="name"
					minAngle={0.1}
					paddingAngle={15}
					innerRadius={100}
					fill="#82ca9d"
					animationDuration={700}
					label={renderActiveShape}
				>
					{data.map((entry, index) => (
						<Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
			</PieChart>
		</ResponsiveContainer>
	);
}

export default PieChartComp;
