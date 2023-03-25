import React from 'react'
import styles from './styles.module.scss'
import Affiliate from 'types/affiliate-chat'
import {Avatar, IconButton} from '@mui/material'
import {stringAvatar} from 'utils/affiliate-chat-utils/helpers'
import {DeviceMode} from 'types/device-mode'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

interface Props {
	affiliate: Affiliate;
	deviceMode: DeviceMode;
	setDeviceMode: (mode: DeviceMode) => void;
}

export default function AffiliateHeader(props: Props) {
	const {affiliate, deviceMode, setDeviceMode} = props
	return (
		<div className={styles.container}>
			{
				deviceMode === DeviceMode.MOBILE_CONVERSATION && (
					<IconButton
						size="large"
						edge="start"
						color="primary"
						aria-label="Affiliate list"
						className={styles.backIcon}
						onClick={() => setDeviceMode(DeviceMode.MOBILE_AFFILIATE)}
					>
						<ChevronLeftIcon/>
					</IconButton>
				)
			}
			{
				affiliate.avatar
					? <Avatar alt={affiliate.name} src={affiliate.avatar} className={styles.avatar}/>
					: <Avatar {...stringAvatar(affiliate.name)} className={styles.avatar}></Avatar>
			}
			<div className={styles.affiliateName}>{affiliate.name}</div>
		</div>
	)
}
