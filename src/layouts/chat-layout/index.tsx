import React, {useEffect} from 'react'
import styles from './styles.module.scss'
import SearchBox from 'components/chat/search-box'
import AffiliateHeader from 'components/chat/affiliate-header'
import ChatConversation from 'components/chat/chat-conversation'
import {DeviceMode} from 'types/device-mode'
import AffiliateList from 'components/chat/affiliate-list'
import {useDispatch, useSelector} from 'react-redux'
import {selectDeviceMode, setDeviceMode} from 'store/reducers/screenSlice'
import {useWindowSize} from 'hooks/window'
import {MOBILE_BREAK_POINT} from 'utils/constants/screen'

export default function ChatLayout() {
	const dispatch = useDispatch()
	const deviceMode = useSelector(selectDeviceMode)
	const screenSize = useWindowSize()


	useEffect(() => {
		if (!screenSize.width) return
		const newMode = screenSize.width <= MOBILE_BREAK_POINT
			? DeviceMode.MOBILE_AFFILIATE
			: DeviceMode.DESKTOP
		if (newMode === deviceMode) return
		dispatch(setDeviceMode(newMode))
	}, [screenSize.width])

	console.log('rendered CHAT LAYOUT', deviceMode)
	return (
		<div className={[styles.container, styles[deviceMode]].join(' ')}>
			<div className={styles.header}>
				<SearchBox/>
				<AffiliateHeader/>
			</div>
			<div className={styles.body}>
				<AffiliateList/>
				<ChatConversation/>
			</div>
		</div>
	)
}
