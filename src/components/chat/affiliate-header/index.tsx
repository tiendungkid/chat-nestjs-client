import React from 'react'
import styles from './styles.module.scss'
import Affiliate from 'types/affiliate-chat'
import {Avatar} from '@mui/material'
import {stringAvatar} from 'utils/affiliate-chat-utils/helpers'

interface Props {
	affiliate: Affiliate;
}

export default function AffiliateHeader(props: Props) {
	const {affiliate} = props
	return (
		<div className={styles.container}>
			{
				affiliate.avatar
					? <Avatar alt={affiliate.name} src={affiliate.avatar} className={styles.avatar}/>
					: <Avatar {...stringAvatar(affiliate.name)} className={styles.avatar}></Avatar>
			}
			<div className={styles.affiliateName}>{affiliate.name}</div>
		</div>
	)
}
