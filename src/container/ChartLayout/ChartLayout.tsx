import React from 'react';

import { Box } from '@mui/material';

import classes from '../Results/Results.module.scss';

interface Props {
	title: string;
	children: React.ReactNode;
}

function ChartLayout({ title, children }: Props) {
	return (
		<Box display="flex" flexDirection="column" minHeight="50%" p={2}>
			<h2 className={classes.title}>{title}</h2>
			<Box className={classes.chartContainer}>{children}</Box>
		</Box>
	);
}

export default ChartLayout;
