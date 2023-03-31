import React, {memo, useCallback} from 'react'
import styles from './styles.module.scss'
import {Avatar, IconButton} from '@mui/material'
import {stringAvatar} from 'utils/affiliate-chat-utils/helpers'
import {DeviceMode} from 'types/device-mode'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import {useDispatch, useSelector} from 'react-redux'
import {selectCurrentAffiliate} from 'store/reducers/conversationSlice'
import {selectDeviceMode, setDeviceMode} from 'store/reducers/screenSlice'

export default memo(function AffiliateHeader() {
	const dispatch = useDispatch()
	const currentAffiliate = useSelector(selectCurrentAffiliate)
	const deviceMode = useSelector(selectDeviceMode)

	const changeDeviceMode = useCallback(() => {
		dispatch(setDeviceMode(DeviceMode.MOBILE_AFFILIATE))
	}, [deviceMode])

	console.log('Affiliate header rendered')
	if (!currentAffiliate) return <></>
	return (
		<div className={[styles.affiliateInfoContainer, styles[deviceMode]].join(' ')}>
			<div className={styles.container}>
				{
					deviceMode === DeviceMode.MOBILE_CONVERSATION && (
						<IconButton
							size="large"
							edge="start"
							color="primary"
							aria-label="Affiliate list"
							className={styles.backIcon}
							onClick={changeDeviceMode}
						>
							<ChevronLeftIcon/>
						</IconButton>
					)
				}
				{
					currentAffiliate.avatar
						? <Avatar alt={currentAffiliate.name} src={currentAffiliate.avatar} className={styles.avatar}/>
						: <Avatar {...stringAvatar(currentAffiliate.name)} className={styles.avatar}></Avatar>
				}
				<div className={styles.affiliateName}>{currentAffiliate.name}</div>
			</div>
		</div>
	)
})
