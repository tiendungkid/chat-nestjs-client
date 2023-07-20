import React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
} from '@mui/material';
import { ALLOW_FILE_TEXT } from 'utils/constants/files';

interface Props {
	open: boolean;
	setOpen: (open: boolean) => void;
}

export default function NotAllowFileTypeDialog(props: Props) {
	const { open, setOpen } = props;
	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogContent>
				<DialogContentText>
					Only file type supported:{' '}
					{[...ALLOW_FILE_TEXT]
						.map((mine) =>
							mine.replaceAll('image/', '').replaceAll('application/', ''),
						)
						.join(', ')}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpen(false)}>Agree</Button>
			</DialogActions>
		</Dialog>
	);
}
