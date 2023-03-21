import React from 'react'
import {Avatar} from '@mui/material'
import styles from './styles.module.scss'

const stringAvatar = (name: string) => {
	if (!name.includes(' ')) {
		return {
			children: name.slice(0, 1)
		}
	}
	return {
		children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
	}
}
const splitLatestChat = (affiliateName: string, latestChat?: string | null) => {
	if (!latestChat) return `Say hi with ${affiliateName}`
	if (latestChat.length > 40) {
		return latestChat.slice(0, 40) + ' ...'
	}
	return latestChat
}

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
				<div className={styles.latestChat}>
					{splitLatestChat(affiliateName, latestChat)}
				</div>
			</div>
		</li>
	)
}
