import React from 'react'
import {Avatar, Badge} from '@mui/material'
import styles from './styles.module.scss'
import {stringAvatar, splitLatestChat} from 'utils/affiliate-chat-utils/helpers'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

interface Props {
    id: number;
    avatar?: string | null;
    affiliateName: string;
    active?: boolean;
    onClick: (id: number) => void;
    hasUnreadMessage?: boolean;
}

export default function AffiliateChat(props: Props) {
	const {
		id,
		avatar,
		affiliateName,
		active,
		onClick,
		hasUnreadMessage
	} = props
	const classes = [styles.container]
	if (hasUnreadMessage) {
		classes.push(styles.unread)
	}
	if (active) classes.push(styles.active)

	return (
		<li className={classes.join(' ')} onClick={() => onClick(id)}>
			{
				avatar
					? <Avatar alt={affiliateName} src={avatar} className={styles.avatar}/>
					: <Avatar {...stringAvatar(affiliateName)} className={styles.avatar}></Avatar>
			}
			<div className={styles.contentWrapper}>
				<div className={styles.content}>
					<div className={styles.affiliateName}>{affiliateName}</div>
					<div className={[styles.latestChat, styles.notChatYet].join(' ')}>
						{splitLatestChat(affiliateName, '')}
					</div>
				</div>
				{
					hasUnreadMessage && (
						<Badge color="secondary" className={styles.isUnreadMessage} variant="dot" invisible={true}>
							<FiberManualRecordIcon color={'info'} fontSize="small"/>
						</Badge>
					)
				}
			</div>
		</li>
	)
}
