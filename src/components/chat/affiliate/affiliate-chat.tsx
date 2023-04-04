import React from 'react'
import {Avatar} from '@mui/material'
import styles from './styles.module.scss'
import {stringAvatar, splitLatestChat} from 'utils/affiliate-chat-utils/helpers'

interface Props {
	id: number;
	avatar?: string | null;
	affiliateName: string;
	latestChat?: string | null;
	active?: boolean;
	onClick: (id: number) => void;
}

export default function AffiliateChat(props: Props) {
	const {id, avatar, affiliateName, latestChat, active, onClick} = props
	const classes = [styles.container]
	if (active) classes.push(styles.active)
	return (
		<li className={classes.join(' ')} onClick={() => onClick(id)}>
			{
				avatar
					? <Avatar alt={affiliateName} src={avatar} className={styles.avatar}/>
					: <Avatar {...stringAvatar(affiliateName)} className={styles.avatar}></Avatar>
			}
			<div className={styles.content}>
				<div className={styles.affiliateName}>{affiliateName}</div>
				<div className={[styles.latestChat, (!latestChat && styles.notChatYet)].join(' ')}>
					{splitLatestChat(affiliateName, latestChat)}
				</div>
			</div>
		</li>
	)
}
