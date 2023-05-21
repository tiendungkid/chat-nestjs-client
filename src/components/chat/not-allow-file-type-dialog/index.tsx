import React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
} from '@mui/material';
import {
	ALLOW_FILE_EXTENSIONS,
	ALLOW_IMAGE_EXTENSIONS,
} from 'utils/constants/files';

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
					{[...ALLOW_IMAGE_EXTENSIONS, ...ALLOW_FILE_EXTENSIONS]
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
