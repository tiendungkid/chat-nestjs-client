import React from 'react'
import styles from './styles.module.scss'
import SearchBox from 'components/chat/search-box'
import AffiliateHeader from 'components/chat/affiliate-header'
import ChatConversation from 'components/chat/chat-conversation'
import {DeviceMode} from 'types/device-mode'
import AffiliateList from 'components/chat/affiliate-list'

export default function ChatLayout() {
	return (
		<div className={[styles.container, styles[DeviceMode.DESKTOP]].join(' ')}>
			<div className={styles.header}>
				<div className={styles.searchAffiliateContainer}>
					<SearchBox/>
				</div>
				<div className={styles.affiliateInfoContainer}>
					<AffiliateHeader/>
				</div>
			</div>
			<div className={styles.body}>
				<ul className={styles.affiliateList}>
					<AffiliateList/>
				</ul>
				<div className={styles.conversation}>
					<ChatConversation/>
				</div>
			</div>
		</div>
	)
}
