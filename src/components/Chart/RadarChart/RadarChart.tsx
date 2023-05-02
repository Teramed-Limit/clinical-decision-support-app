import { useState } from 'react';

import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';

function RadarChartComp() {
	const [data, setData] = useState([
		{ name: 'D136', value: 0.3673663198148675 },
		{ name: 'D108', value: 1.210397650733414 },
		{ name: 'D117', value: 1.2645496876787636 },
		{ name: 'D134', value: 1.3503364853152708 },
		{ name: 'D132', value: 1.3732742940185232 },
		{ name: 'D118', value: 1.4010892853764318 },
		{ name: 'D135', value: 1.4649851834743066 },
		{ name: 'D133', value: 1.61211590612349 },
		{ name: 'D126', value: 1.6374771272305957 },
		{ name: 'D097', value: 1.680019618958559 },
		{ name: 'D098', value: 50 },
	]);

	const handleChange = (name: string, checked: boolean) => {
		const newData = data.filter((d) => (d.name === name ? { ...d, checked } : d));
		setData(newData);
	};

	return (
		<>
			<Stack direction="row" p={2} alignItems="center" justifyContent="center" spacing={2}>
				{data.map((value) => {
					return (
						<FormControlLabel
							key={value.name}
							control={
								<Checkbox
									defaultChecked
									onChange={(event) => handleChange(value.name, event.currentTarget.checked)}
								/>
							}
							label={value.name}
						/>
					);
				})}
			</Stack>
			<ResponsiveContainer>
				<RadarChart data={data}>
					<PolarGrid />
					<PolarAngleAxis dataKey="name" />
					<PolarRadiusAxis />
					<Radar name="Mike" dataKey="value" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} />
					<Tooltip />
				</RadarChart>
			</ResponsiveContainer>
		</>
	);
}

export default RadarChartComp;
