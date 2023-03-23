import React from 'react'
import styles from './styles.module.scss'

interface Props {
	open: boolean;
}

const DropzoneOverlay = (props: Props) => {
	const {open} = props
	if (!open) return <></>
	return (
		<div className={styles.overlay}>
			Drop file here
		</div>
	)
}

export default DropzoneOverlay
