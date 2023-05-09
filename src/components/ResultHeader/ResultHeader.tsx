import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CakeIcon from '@mui/icons-material/Cake';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import WcIcon from '@mui/icons-material/Wc';
import { Box, Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

import classes from './ResultHeader.module.scss';
import EnvService from '../../services/EnvService';
import { ResultQueryData } from '../../types/result-query-data';
import { convertToDate, stringFormatDate } from '../../utils/date-utils';

export const headerInfoHeight = 82;

function ResultHeader() {
	const location = useLocation();
	const locationState = location.state as ResultQueryData;

	return (
		<Box style={{ height: `${headerInfoHeight}px` }} className={classes.headerInfo}>
			<Stack direction="column" spacing={1}>
				<Stack direction="row" spacing={2}>
					<div className={classes.iconText}>
						<ContactPageIcon />
						<Typography variant="h6" fontSize="1rem" lineHeight="1.5rem" component="span" color="primary">
							Patient ID:&nbsp;
						</Typography>
						<Typography variant="body1" component="span">
							{locationState.patientId}
						</Typography>
					</div>
					<div className={classes.iconText}>
						<CakeIcon />
						<Typography variant="h6" fontSize="1rem" lineHeight="1.5rem" component="span" color="primary">
							Age:&nbsp;
						</Typography>
						<Typography variant="body1" component="span">
							{locationState.patientsAge}
						</Typography>
					</div>
					<div className={classes.iconText}>
						<CalendarTodayIcon />
						<Typography variant="h6" fontSize="1rem" lineHeight="1.5rem" component="span" color="primary">
							Study Date:&nbsp;
						</Typography>
						<Typography variant="body1" component="span">
							{convertToDate(
								stringFormatDate(locationState.studyDate, 'yyyyMMdd'),
								EnvService.getDateFormat(),
							)}
						</Typography>
					</div>
				</Stack>
				<Stack direction="row" spacing={2}>
					<div className={classes.iconText}>
						<AccountCircleIcon />
						<Typography variant="h6" fontSize="1rem" lineHeight="1.5rem" component="span" color="primary">
							Patient Name:&nbsp;
						</Typography>
						<Typography variant="body1" component="span">
							{locationState.patientsName}
						</Typography>
					</div>
					<div className={classes.iconText}>
						<WcIcon />
						<Typography variant="h6" fontSize="1rem" lineHeight="1.5rem" component="span" color="primary">
							Sex:&nbsp;
						</Typography>
						<Typography variant="body1" component="span">
							{locationState.patientsSex}
						</Typography>
					</div>
					<div className={classes.iconText}>
						<FileUploadIcon />
						<Typography variant="h6" fontSize="1rem" lineHeight="1.5rem" component="span" color="primary">
							Upload Date:&nbsp;
						</Typography>
						<Typography variant="body1" component="span">
							{locationState.searchDateTime &&
								convertToDate(new Date(locationState.searchDateTime), EnvService.getDateTimeFormat())}
						</Typography>
					</div>
				</Stack>
			</Stack>
		</Box>
	);
}

export default ResultHeader;
