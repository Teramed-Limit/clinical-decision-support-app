import React, { useRef, useState } from 'react';

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';
import { useSetRecoilState } from 'recoil';

import { atomNotification } from '../../../recoil/atoms/notification';
import { ChartData, ChartDataFilter } from '../../../types/chart-data';
import { MessageType } from '../../../types/notification';
import { labelValueData } from '../../../types/reference-case';
import { get } from '../../../utils/api/api';
import FullScreenDetailList from '../../FullScreenDetailList/FullScreenDetailList';
import ChartFilter from '../ChartFilter/ChartFilter';

interface Props {
	data: ChartData[];
	filter?: boolean;
}

type FullScreenDetailListCompHandle = React.ElementRef<typeof FullScreenDetailList>;

// 自訂點擊事件的標籤元件
function CustomTick({ payload, x, y, textAnchor, stroke, radius, handleClick }: any) {
	return (
		<g className="recharts-layer recharts-polar-angle-axis-tick">
			<text
				radius={radius}
				stroke={stroke}
				x={x}
				y={y}
				className="recharts-text recharts-polar-angle-axis-tick-value"
				textAnchor={textAnchor}
			>
				<tspan
					style={{ cursor: 'pointer', userSelect: 'none' }}
					x={x}
					dy="0em"
					onClick={(event) => {
						event.stopPropagation();
						event.preventDefault();
						handleClick(payload.value);
					}}
				>
					{payload.value}
				</tspan>
			</text>
		</g>
	);
}

function RadarChartComp({ data = [], filter = false }: Props) {
	// #region useState
	const [rawData, setRawData] = useState<ChartDataFilter[]>(
		data.map((d) => ({
			...d,
			visible: true,
		})),
	);
	const [caseDetailDataset, setCaseDetailDataset] = useState<labelValueData[]>([]);
	// #endregion

	// #region useSetRecoilState
	const setNotification = useSetRecoilState(atomNotification);
	// #endregion

	// #region useRef
	const fullScreenDetailListRef = useRef<FullScreenDetailListCompHandle>(null);
	// #endregion

	// 過濾掉不可見的資料值
	const filteredData = rawData.filter((d) => d.visible);

	// #region function
	const handleClick = (caseNoLabel: string | undefined) => {
		if (!caseNoLabel) return;
		get<labelValueData[]>(`/api/result/referenceCase/${caseNoLabel}`)
			.then((res) => {
				setCaseDetailDataset(res);
				fullScreenDetailListRef.current?.handleShawDialog(true);
			})
			.catch((err) => {
				setNotification({
					messageType: MessageType.Error,
					message: err.message,
				});
			});
	};
	// #endregion

	return (
		<>
			{/* 創建一個包含 checkbox 的水平 Stack，以控制資料值的顯示 */}
			{filter && <ChartFilter data={rawData} onDataChange={setRawData} />}
			{/* 使用 ResponsiveContainer 使雷達圖自動適應容器大小 */}
			<ResponsiveContainer>
				<RadarChart
					data={filteredData}
					onClick={(prop: CategoricalChartState) => handleClick(prop.activeLabel)}
				>
					<PolarGrid />
					<PolarAngleAxis dataKey="key" tick={<CustomTick handleClick={handleClick} />} />
					<Radar dataKey="value" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} />
					{/* <Tooltip /> */}
					<Tooltip />
				</RadarChart>
			</ResponsiveContainer>
			<FullScreenDetailList ref={fullScreenDetailListRef} labelValueDataset={caseDetailDataset} />
		</>
	);
}

export default RadarChartComp;
