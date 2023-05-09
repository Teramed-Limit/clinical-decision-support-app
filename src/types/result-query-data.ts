import { StudyStatus } from './enums/study-status';

export interface ResultQueryData {
	patientId: string;
	patientsName: string;
	patientsSex: string;
	patientsBirthDate: string;
	patientsAge: string;
	modality: string;
	studyDate: string;
	studyDescription: string;
	searchDateTime: Date;
	processDateTime: Date;
	processMessage: string;
	receiveDateTime: Date;
	receiveMessage: string;
	statusCode: StudyStatus;
	statusDescription: any;
	studyInstanceUID: string;
}
