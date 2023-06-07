import React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
} from '@mui/material';

interface Props {
	open: boolean;
	onClose: () => void;
	content: React.ReactNode;
}

export default function UploadFailedDialog(props: Props) {
	const { open, onClose, content } = props;

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogContent>
				<DialogContentText>{content}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Agree</Button>
			</DialogActions>
		</Dialog>
	);
}
