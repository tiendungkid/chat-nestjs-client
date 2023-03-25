import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss'
import Affiliate from 'types/affiliate-chat'
import {AffiliateChat, AffiliateChatSkeleton} from 'components/chat/affiliate'
import SearchBox from 'components/chat/search-box'
import ConversationLoading from 'components/chat/conversation-loading'
import AffiliateHeader from 'components/chat/affiliate-header'
import ChatConversation from 'components/chat/chat-conversation'
import {DeviceMode} from 'types/device-mode'
import {useWindowSize} from 'hooks/window'
import {MOBILE_BREAK_POINT} from 'utils/constants/screen'

interface Props {
	affiliates: Affiliate[],
	loadingAffiliate: boolean;
	loadingConversation: boolean;
	activeConversation: Affiliate | null;
	onAffiliateClicked: (id: number) => void;
	onSearchChange: (val: string) => void;
	chatValue: string;
	setChatValue: (text: string) => void;
}

export default function ChatLayout(props: Props) {
	const {
		affiliates,
		loadingAffiliate,
		loadingConversation,
		activeConversation,
		onAffiliateClicked,
		onSearchChange,
		chatValue,
		setChatValue
	} = props

	const onAffiliateClickedHandler = (id: number) => {
		onAffiliateClicked(id)
		if (deviceMode === DeviceMode.MOBILE_AFFILIATE) {
			setDeviceMode(DeviceMode.MOBILE_CONVERSATION)
		}
	}

	const screenSize = useWindowSize()

	const affiliateList = () => {
		return affiliates.map(affiliate => (
			<AffiliateChat
				key={affiliate.id}
				id={affiliate.id}
				affiliateName={affiliate.name}
				avatar={affiliate.avatar}
				latestChat={affiliate.latestChat}
				active={affiliate.id === activeConversation?.id}
				onClick={onAffiliateClickedHandler}
			/>))
	}

	const [deviceMode, setDeviceMode] =
		useState<DeviceMode>(
			(screenSize.width && (screenSize.width <= MOBILE_BREAK_POINT))
				? DeviceMode.MOBILE_AFFILIATE
				: DeviceMode.DESKTOP
		)

	useEffect(() => {
		if (!screenSize.width) return
		if (screenSize.width <= MOBILE_BREAK_POINT) {
			setDeviceMode(DeviceMode.MOBILE_AFFILIATE)
			return
		}
		setDeviceMode(DeviceMode.DESKTOP)
	}, [screenSize.width])

	return (
		<div className={[styles.container, styles[deviceMode]].join(' ')}>
			<div className={styles.header}>
				<div className={styles.searchAffiliateContainer}>
					<SearchBox onChange={onSearchChange}/>
				</div>
				<div className={styles.affiliateInfoContainer}>
					{activeConversation &&
						<AffiliateHeader affiliate={activeConversation} deviceMode={deviceMode}
										 setDeviceMode={setDeviceMode}/>}
				</div>
			</div>
			<div className={styles.body}>
				<ul className={styles.affiliateList}>
					{loadingAffiliate ? <AffiliateChatSkeleton/> : affiliateList()}
				</ul>
				<div className={styles.conversation}>
					{
						(loadingConversation && activeConversation)
							? <ConversationLoading/>
							: (activeConversation &&
								<ChatConversation
									affiliate={activeConversation}
									chatValue={chatValue}
									setChatValue={setChatValue}/>)
					}
				</div>
			</div>
		</div>
	)
}
