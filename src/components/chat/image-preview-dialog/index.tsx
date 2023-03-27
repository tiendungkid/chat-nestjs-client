import React, {memo} from 'react'
import {Dialog} from '@mui/material'

interface Props {
	open: boolean;
	imageUrl: string;
	setOpen: (open: boolean) => void;
}

export default memo(function ImagePreviewDialog(props: Props) {
	const {open, imageUrl, setOpen} = props
	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<img src={imageUrl} alt=""/>
		</Dialog>
	)
}
)
