export interface ReferenceCase {
	caseNo: number;
	dateOfBirth?: string;
	age?: number;
	gender?: number;
	hBsAg?: number;
	HBeAg?: number;
	albumin?: number;
	bilirubin?: number;
	aLP?: number;
	aLT?: number;
	aST?: number;
	gGT?: number;
	hGB?: number;
	wBC?: number;
	platelet?: number;
	iNR?: number;
	aFP?: number;
	hBV_D_1?: string;
	anti_HCV?: string;
	hCV_D_1?: string;
	liver_disease?: string;
	fibrosis_4?: number;
	dx1?: string;
	size1?: string;
	location1?: string;
	validated_Dx1?: string;
	dx2?: string;
	size2?: string;
	location2?: string;
	validated_Dx2?: string;
	dx3?: string;
	size3?: string;
	location3?: string;
	validated_Dx3?: string;
	dx4?: string;
	size4?: string;
	location4?: string;
	validated_Dx4?: string;
	clinical_Dx4?: string;
	intraOp_Validation_Dx4?: string;
	radiological_Dx4?: string;
	radi_Validated_Date_Dx4?: string;
	validated_modality_Dx4?: string;
	pathological_Dx4?: string;
	differentiation_Dx4?: string;
	dx5?: string;
	size5?: string;
	location5?: string;
	validated_Dx5?: string;
	clinical_Dx5?: string;
	intraOp_Validation_Dx5?: string;
	radiological_Dx5?: string;
	radi_Validated_Date_Dx5?: string;
	validated_modality_Dx5?: string;
	pathological_Dx5?: string;
	differentiation_Dx5?: string;
	aI_algorithms?: string;
	dx6?: string;
	size6?: string;
	location6?: string;
	validated_Dx6?: string;
	clinical_Dx6?: string;
	intraOp_Validation_Dx6?: string;
	radiological_Dx6?: string;
	radi_Validated_Date_Dx6?: string;
	validated_modality_Dx6?: string;
	pathological_Dx6?: string;
	differentiation_Dx6?: string;
	dx7?: string;
	size7?: string;
	location7?: string;
	validated_Dx7?: string;
	clinical_Dx7?: string;
	intraOp_Validation_Dx7?: string;
	radiological_Dx7?: string;
	radi_Validated_Date_Dx7?: string;
	radiological_Rpt_CT?: string;
}

export interface labelValueData {
	label: string;
	value: string;
}
