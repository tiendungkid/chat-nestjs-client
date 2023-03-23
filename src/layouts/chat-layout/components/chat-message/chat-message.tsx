import React from 'react'
import styles from './styles.module.scss'
import {Avatar, Grid, Tooltip, Typography} from '@mui/material'
import {stringAvatar} from 'utils/affiliate-chat-utils/helpers'
import {ChatMessage as Messages} from 'types/conversation/chat-message'

interface Props {
	affiliateName: string
	avatar?: string
	messages: Messages[]
	side: 'left' | 'right'
}

export default function ChatMessage(props: Props) {
	const {
		affiliateName,
		avatar,
		messages,
		side
	} = props
	const attachClass = (index: number, side: 'left' | 'right'): string[] => {
		const rowClass = index === 0
			? styles[side + 'First']
			: (index === messages.length - 1 ? styles[side + 'Last'] : '')
		return [styles.message, rowClass, styles[side]]
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
							<Tooltip title={message.sent_at} placement={'right-end'}>
								<Typography
									align={'left'}
									className={attachClass(index, side).join(' ')}
								>
									{message.message}
								</Typography>
							</Tooltip>
						</div>
					)
				})}
			</Grid>
		</Grid>
	)
}
