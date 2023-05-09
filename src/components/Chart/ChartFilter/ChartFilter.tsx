import { Checkbox, FormControlLabel, Stack } from '@mui/material';

import { ChartDataFilter } from '../../../types/chart-data';

type ChartFilterProps = {
	data: ChartDataFilter[];
	onDataChange: (newData: ChartDataFilter[]) => void;
};

function ChartFilter({ data, onDataChange }: ChartFilterProps) {
	const handleVisibilityChange = (index: number) => {
		const newData = [...data];
		newData[index].visible = !newData[index].visible;
		onDataChange(newData);
	};

	return (
		<Stack direction="row" p={2} alignItems="center" justifyContent="center" spacing={2}>
			{data.map((value, index) => (
				<FormControlLabel
					key={value.key}
					control={<Checkbox defaultChecked onChange={() => handleVisibilityChange(index)} />}
					label={value.key}
				/>
			))}
		</Stack>
	);
}

export default ChartFilter;
