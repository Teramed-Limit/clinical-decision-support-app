export interface AnalysisResult {
	segmentationPath: string;
	saliencyMapPath: string;
	studyUid: string;
	metastasisPrediction: number;
	confidence: Confidence[];
	featureImportance: FeatureImportance[];
	similarCases: SimilarCase[];
}

export interface Confidence {
	key: string;
	value: number;
}

export interface SimilarCase {
	key: string;
	value: number;
}

export interface FeatureImportance {
	key: string;
	value: number;
}
