import React from 'react'
import styles from './styles.module.scss'
import Affiliate from 'types/affiliate-chat'
import {AffiliateChatSkeleton, AffiliateChat} from 'components/chat/affiliate'
import SearchBox from 'components/chat/search-box'
import ConversationLoading from 'components/chat/conversation-loading'
import AffiliateHeader from 'components/chat/affiliate-header'
import ChatConversation from 'components/chat/chat-conversation'
import {ChatMessage} from 'types/conversation/chat-message'

interface Props {
	affiliates: Affiliate[],
	loadingAffiliate: boolean;
	loadingConversation: boolean;
	activeConversation: Affiliate | null;
	onAffiliateClicked: (id: number) => void;
	onSearchChange: (val: string) => void;
	chatValue: string;
	setChatValue: (text: string) => void;
	messages: ChatMessage[][]
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
		setChatValue,
		messages
	} = props


	const affiliateList = () => {
		return affiliates.map(affiliate => (
			<AffiliateChat
				key={affiliate.id}
				id={affiliate.id}
				affiliateName={affiliate.name}
				avatar={affiliate.avatar}
				latestChat={affiliate.latestChat}
				active={affiliate.id === activeConversation?.id}
				onClick={onAffiliateClicked}
			/>))
	}


	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.searchAffiliateContainer}>
					<SearchBox onChange={onSearchChange}/>
				</div>
				<div className={styles.affiliateInfoContainer}>
					{activeConversation && <AffiliateHeader affiliate={activeConversation}/>}
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
									messages={messages}
									chatValue={chatValue}
									setChatValue={setChatValue}/>)
					}
				</div>
			</div>
		</div>
	)
}
