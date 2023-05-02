import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
	{
		name: 'MORPH-2D-Diameter',
		value: 3.6610461924727436e-180,
	},
	{
		name: 'LHL-Firstorder-TotalEnergy',
		value: 0.5,
	},
	{
		name: 'HLH-Firstorder-Maximum',
		value: 1.9201704976886885e-267,
	},
	{
		name: 'HHH-GLSZM-SZNN,LHL-GLSZM-GLNU',
		value: 5.67720709335919e-3077,
	},
	{
		name: 'GLSZM-LAHGLE',
		value: 0.0,
	},
	{
		name: 'HLL-GLSZM-SZNU',
		value: 0.5,
	},
	{
		name: 'LLL-GLDM-SDLGLE',
		value: 0.0,
	},
];

function BarChartComp() {
	return (
		<ResponsiveContainer>
			<BarChart
				data={data}
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
				<YAxis type="category" dataKey="name" />
				<Tooltip />
				<Legend />
				<Bar dataKey="value" fill="#8884d8" />
			</BarChart>
		</ResponsiveContainer>
	);
}

export default BarChartComp;
