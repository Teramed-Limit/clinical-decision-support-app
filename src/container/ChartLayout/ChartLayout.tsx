import React from 'react';

import { Box, Typography } from '@mui/material';

import classes from './ChartLayout.module.scss';

interface Props {
	title: string;
	minHeight?: string;
	children: React.ReactNode;
}

function ChartLayout({ title, minHeight = '50%', children }: Props) {
	return (
		<Box display="flex" flexDirection="column" minHeight={minHeight} p={2}>
			<Typography variant="h4" sx={{ margin: 'auto' }}>
				{title}
			</Typography>
			<Box className={classes.chartContainer}>{children}</Box>
		</Box>
	);
}

export default ChartLayout;
