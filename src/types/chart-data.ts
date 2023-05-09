export interface ChartDataFilter {
	key: string;
	value: number;
	visible: boolean;
}

export type ChartData = Omit<ChartDataFilter, 'visible'>;
