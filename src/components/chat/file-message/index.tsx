import React from 'react'
import {Typography} from '@mui/material'
import {ChatMessage} from 'types/conversation/chat-message'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import styles from './styles.module.scss'

interface Props {
	message: ChatMessage
}

export default function FileMessage(props: Props) {
	const {message} = props
	const redirectFile = (url: string) => window.open(url)
	return (
		<div className={styles.fileContainer} onClick={() => redirectFile(message.message)}>
			<CloudDownloadIcon fontSize={'medium'} className={styles.downLoadIcon}/>
			<Typography className={styles.fileName}>{message.message.replace(/^.*[\\/]/, '').toString()}</Typography>
		</div>
	)
}
