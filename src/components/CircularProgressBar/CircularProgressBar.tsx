import { CircularProgressbar } from 'react-circular-progressbar';

interface Props {
	title: string;
	value: number | undefined;
}

function CircularProgressBar({ title, value }: Props) {
	return (
		<>
			<div
				style={{
					textAlign: 'center',
					paddingTop: '14px',
					color: '#f88',
					fontWeight: 'bold',
				}}
			>
				{title}
			</div>
			<CircularProgressbar
				styles={{
					// Customize the root svg element
					root: {
						width: '100%',
						height: '100%',
						paddingTop: '14px',
					},
					// Customize the path, i.e. the "completed progress"
					path: {
						// Path color
						stroke: `rgba(62, 152, 199)`,
						// Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
						strokeLinecap: 'butt',
						// Customize transition animation
						transition: 'stroke-dashoffset 0.5s ease 0s',
						transform: 'rotate(-135deg)',
						transformOrigin: 'center center',
					},
					// Customize the circle behind the path, i.e. the "total progress"
					trail: {
						// Trail color
						stroke: '#d6d6d6',
						strokeLinecap: 'butt',
						transform: 'rotate(-135deg)',
						transformOrigin: 'center center',
					},
					// Customize the text
					text: {
						// Text color
						fill: '#f88',
						// Text size
						fontSize: '24px',
						fontWeight: 'bold',
					},
					// Customize background - only used when the `background` prop is true
					background: {
						fill: '#3e98c7',
					},
				}}
				circleRatio={0.75} /* Make the circle only 0.75 of the full diameter */
				maxValue={100}
				value={value || 0}
				text={`${value || 'N/A'}%`}
			/>
		</>
	);
}

export default CircularProgressBar;
