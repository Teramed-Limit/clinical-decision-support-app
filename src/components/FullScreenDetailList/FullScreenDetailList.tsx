import React, { forwardRef, useImperativeHandle, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';

import { labelValueData } from '../../types/reference-case';

/** *******************************************************************************
 * Parameter
 ******************************************************************************** */
export interface DetailListProps {
	labelValueDataset: labelValueData[];
}
/** *****************************************************************************
 * Function Prototype
 ***************************************************************************** */
export type FullScreenListService = {
	handleShawDialog: (isOpen: boolean) => void;
};
/** *******************************************************************************
 * Transition
 ******************************************************************************** */
const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});
/** *******************************************************************************
 * Full screen dialog
 ******************************************************************************** */
const FullScreenDetailList = forwardRef<FullScreenListService, DetailListProps>((Props, ref) => {
	// #region useState
	const [open, setOpen] = useState(false);
	// #endregion

	// #region useImperativeHandle
	useImperativeHandle(ref, () => ({
		handleShawDialog: (isOpen) => setOpen(isOpen),
	}));
	// #endregion

	// #region function
	const handleClose = () => {
		setOpen(false);
	};
	// #endregion

	return (
		<div>
			<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
				<AppBar sx={{ position: 'sticky' }}>
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h5" component="div">
							Reference Case Detail Data
						</Typography>
					</Toolbar>
				</AppBar>
				<List>
					{Props.labelValueDataset.map((data) => (
						<div key={data.label}>
							<ListItem>
								<ListItemText
									sx={{ whiteSpace: 'pre-wrap' }}
									primary={data.label}
									primaryTypographyProps={{ style: { fontSize: '20px' } }}
									secondary={data.value}
									secondaryTypographyProps={{ style: { fontSize: '16px', color: '#3399FF' } }}
								/>
							</ListItem>
							<Divider />
						</div>
					))}
				</List>
			</Dialog>
		</div>
	);
});

export default React.memo(FullScreenDetailList);
