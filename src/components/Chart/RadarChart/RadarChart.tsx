import { useRef, useState } from 'react';

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';

import { ChartData, ChartDataFilter } from '../../../types/chart-data';
import ChartFilter from '../ChartFilter/ChartFilter';
import { CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';
import { get } from '../../../utils/api/api';
import { useSetRecoilState } from 'recoil';
import { atomNotification } from '../../../recoil/atoms/notification';
import { MessageType } from '../../../types/notification';
import { labelValueData } from '../../../types/reference-case';
import FullScreenDetailList from '../../FullScreenDetailList/FullScreenDetailList';

interface Props {
	data: ChartData[];
	filter?: boolean;
}
type FullScreenDetailListCompHandle = React.ElementRef<typeof FullScreenDetailList>;
function RadarChartComp({ data = [], filter = false }: Props) {
	//#region useState
	const [rawData, setRawData] = useState<ChartDataFilter[]>(data.map((d) => ({ ...d, visible: true })));
	const [caseDetailDataset, setCaseDetailDataset] = useState<labelValueData[]>([]);
	//#endregion

	//#region useSetRecoilState
	const setNotification = useSetRecoilState(atomNotification);
	//#endregion

	//#region useRef
	const fullScreenDetailListRef = useRef<FullScreenDetailListCompHandle>(null);
	//#endregion

	// 過濾掉不可見的資料值
	const filteredData = rawData.filter((d) => d.visible);

	//#region function
	const handleClick = (data: CategoricalChartState) => {
		const caseNoLabel = data.activeLabel;
		get<labelValueData[]>(`/api/result/referenceCase/${caseNoLabel}`)
			.then((res) => {
				debugger;
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
	//#endregion

	return (
		<>
			{/* 創建一個包含 checkbox 的水平 Stack，以控制資料值的顯示 */}
			{filter && <ChartFilter data={rawData} onDataChange={setRawData} />}
			{/* 使用 ResponsiveContainer 使雷達圖自動適應容器大小 */}
			<ResponsiveContainer>
				<RadarChart data={filteredData} onClick={handleClick}>
					<PolarGrid />
					<PolarAngleAxis dataKey="key" />
					<Radar dataKey="value" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} />
					<Tooltip />
				</RadarChart>
			</ResponsiveContainer>
			<FullScreenDetailList ref={fullScreenDetailListRef} labelValueDataset={caseDetailDataset} />
		</>
	);
}

export default RadarChartComp;
