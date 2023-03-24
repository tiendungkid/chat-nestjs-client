import React from 'react'
import styles from './styles.module.scss'
import {Avatar, Grid, Tooltip, Typography} from '@mui/material'
import {stringAvatar} from 'utils/affiliate-chat-utils/helpers'
import {ChatMessage as Messages} from 'types/conversation/chat-message'
import {MessageType} from 'types/conversation/message-type'
import Typing from '../typing'
import ImageMessage from '../image-message'
import FileMessage from '../file-message'

interface Props {
	affiliateName: string
	avatar?: string
	messages: Messages[]
	side: 'left' | 'right'
	setMessageImageUrl: (imageUrl: string) => void
	setOpenImagePreviewDialog: (open: boolean) => void
}

export default function ChatMessage(props: Props) {
	const {
		affiliateName,
		avatar,
		messages,
		side,
		setMessageImageUrl,
		setOpenImagePreviewDialog

	} = props
	const attachClass = (index: number, side: 'left' | 'right'): string[] => {
		const rowClass = index === 0
			? styles[side + 'First']
			: (index === messages.length - 1 ? styles[side + 'Last'] : '')
		return [styles.message, rowClass, styles[side]]
	}
	const onImageMessageClicked = (imageUrl: string) => {
		setMessageImageUrl(imageUrl)
		setOpenImagePreviewDialog(true)
	}

	const renderMessage = (msg: Messages, index: number) => {
		if (msg.message_type === MessageType.TYPING) {
			return (
				<div className={attachClass(index, side).join(' ')}>
					<Typing/>
				</div>
			)
		}
		if (msg.message_type === MessageType.IMAGE) {
			return <ImageMessage message={msg} onImageClick={onImageMessageClicked}/>
		}
		if (msg.message_type === MessageType.FILE) {
			return <FileMessage message={msg}/>
		}
		return (
			<Tooltip title={msg.sent_at} placement={'right-start'}>
				<Typography
					align={'left'}
					className={attachClass(index, side).join(' ')}
				>
					{msg.message}
				</Typography>
			</Tooltip>
		)
	}

	return (
		<Grid
			container
			spacing={2}
			justifyContent={side === 'right' ? 'flex-end' : 'flex-start'}
			className={styles.chatMessage}
		>
			{side === 'left' && (
				<Grid item>
					<Tooltip title={affiliateName} placement="top-start">
						{
							avatar
								? <Avatar alt={affiliateName} src={avatar} className={styles.avatar}/>
								: <Avatar {...stringAvatar(affiliateName)} className={styles.avatar}></Avatar>
						}
					</Tooltip>
				</Grid>
			)}
			<Grid item xs={8}>
				{messages.map((message, index) => {
					return (
						<div key={message.id} className={styles[side + 'Row']}>
							{renderMessage(message, index)}
						</div>
					)
				})}
			</Grid>
		</Grid>
	)
}
