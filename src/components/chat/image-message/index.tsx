import React from 'react'
import {ChatMessage} from 'types/conversation/chat-message'
import styles from './styles.module.scss'
import {Tooltip} from '@mui/material'

interface Props {
	message: ChatMessage,
	onImageClick: (message: string) => void;
}

const ImageMessage = (props: Props) => {
	const {message, onImageClick} = props
	return (
		<div className={styles.imageContainer}>
			<Tooltip title={message.sent_at} placement={'right-start'}>
				<img src={message.message} alt="" onClick={() => onImageClick(message.message)}/>
			</Tooltip>
		</div>
	)
}

export default ImageMessage
