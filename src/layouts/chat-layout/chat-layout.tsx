import React, {useCallback, useEffect, useState} from 'react'
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
import {chatMessages} from 'components/chat/test'
import {setChatMessages} from 'store/reducers/conversationSlice'
import {useDispatch} from 'react-redux'

interface Props {
    affiliates: Affiliate[],
    loadingAffiliate: boolean;
    onSearchChange: (val: string) => void;
    chatValue: string;
    setChatValue: (text: string) => void;
}

export default function ChatLayout(props: Props) {
	const {
		affiliates,
		loadingAffiliate,
		onSearchChange,
		chatValue,
		setChatValue
	} = props

	const dispatch = useDispatch()
	const screenSize = useWindowSize()
	const [deviceMode, setDeviceMode] =
        useState<DeviceMode>(
        	(screenSize.width && (screenSize.width <= MOBILE_BREAK_POINT))
        		? DeviceMode.MOBILE_AFFILIATE
        		: DeviceMode.DESKTOP)

	const [currentAffiliate, setCurrentAffiliate] = useState<Affiliate | null>(null)
	const [loadingConversation, setLoadingConversation] = useState(false)

	const onAffiliateClickedHandler = useCallback((affiliate: Affiliate) => {
		setCurrentAffiliate(affiliate)
		setLoadingConversation(true)
		if (deviceMode === DeviceMode.MOBILE_AFFILIATE) {
			setDeviceMode(DeviceMode.MOBILE_CONVERSATION)
		}
		const timer = setTimeout(() => {
			setLoadingConversation(false)
			dispatch(setChatMessages(chatMessages))
		}, 500)
		return () => {
			clearTimeout(timer)
		}
	}, [currentAffiliate])

	const affiliateList = () => {
		return affiliates.map(affiliate => (
			<AffiliateChat
				key={affiliate.id}
				id={affiliate.id}
				affiliateName={affiliate.name}
				avatar={affiliate.avatar}
				latestChat={affiliate.latestChat}
				active={affiliate.id === currentAffiliate?.id}
				onClick={() => onAffiliateClickedHandler(affiliate)}
			/>))
	}

	useEffect(() => {
		if (!screenSize.width) return
		const newMode = screenSize.width <= MOBILE_BREAK_POINT
			? DeviceMode.MOBILE_AFFILIATE
			: DeviceMode.DESKTOP
		if (newMode === deviceMode) return
		setDeviceMode(newMode)
	}, [screenSize.width])

	console.log(111)

	return (
		<div className={[styles.container, styles[deviceMode]].join(' ')}>
			<div className={styles.header}>
				<div className={styles.searchAffiliateContainer}>
					<SearchBox onChange={onSearchChange}/>
				</div>
				<div className={styles.affiliateInfoContainer}>
					{currentAffiliate &&
                        <AffiliateHeader affiliate={currentAffiliate} deviceMode={deviceMode}
                        	setDeviceMode={setDeviceMode}/>}
				</div>
			</div>
			<div className={styles.body}>
				<ul className={styles.affiliateList}>
					{loadingAffiliate ? <AffiliateChatSkeleton/> : affiliateList()}
				</ul>
				<div className={styles.conversation}>
					{
						(loadingConversation && currentAffiliate)
							? <ConversationLoading/>
							: (currentAffiliate &&
                                <ChatConversation
                                	affiliate={currentAffiliate}
                                	chatValue={chatValue}
                                	setChatValue={setChatValue}/>)
					}
				</div>
			</div>
		</div>
	)
}
