import React, { useState } from 'react';

import { Box, Slider, Typography } from '@mui/material';

interface Props {
	images: string[];
	opacityData: { label: string; opacity: number }[];
}

function OverlapImage({ images, opacityData }: Props) {
	const [opacityList, setOpacityList] = useState(opacityData);

	const handleOpacityChange = (value: number, index: number) => {
		const newOpacityList = [...opacityList];
		newOpacityList[index].opacity = value;
		setOpacityList(newOpacityList);
	};

	return (
		<Box
			sx={{
				position: 'relative',
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				':hover > div': { opacity: 1 },
			}}
		>
			{images.map((url, index) => {
				return (
					<img
						key={url}
						src={url}
						alt=""
						style={{
							position: 'absolute',
							top: '0',
							left: '0',
							width: '100%',
							height: '100%',
							objectFit: 'contain',
							opacity: opacityList[index].opacity || 1,
						}}
					/>
				);
			})}
			<Box
				sx={{
					position: 'absolute',
					bottom: '10px',
					width: '50%',
					opacity: 0,
					transition: 'opacity 0.3s',
				}}
			>
				{opacityList.map((value, idx) => {
					return (
						<React.Fragment key={value.label}>
							<Typography style={{ color: '#FF6347', fontWeight: 'bold' }} gutterBottom>
								{value.label}
							</Typography>
							<Slider
								value={value.opacity}
								onChange={(_event, newValue) => handleOpacityChange(newValue as number, idx)}
								max={1}
								min={0}
								step={0.01}
								marks
								valueLabelDisplay="auto"
							/>
						</React.Fragment>
					);
				})}
			</Box>
		</Box>
	);
}

export default OverlapImage;
