import React from 'react'
import styles from './styles.module.scss'
import Affiliate from '../../types/affiliate-chat'
import {AffiliateChatSkeleton, AffiliateChat} from '../../components/affiliate'
import SearchBox from './components/search-box'
import ConversationLoading from './components/conversation-loading'
import AffiliateHeader from './components/affiliate-header'

interface Props {
	affiliates: Affiliate[],
	loadingAffiliate: boolean;
	loadingConversation: boolean;
	activeConversation: Affiliate | null;
	onAffiliateClicked: (id: number) => void;
	onSearchChange: (val: string) => void;
}

export default function ChatLayout(props: Props) {
	const {affiliates, loadingAffiliate, loadingConversation, activeConversation, onAffiliateClicked, onSearchChange} = props


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
					{ activeConversation && <AffiliateHeader affiliate={activeConversation} /> }
				</div>
			</div>
			<div className={styles.body}>
				<ul className={styles.affiliateList}>
					{loadingAffiliate ? <AffiliateChatSkeleton/> : affiliateList()}
				</ul>
				<div className={styles.conversation}>
					{
						(loadingConversation && activeConversation)
							? <ConversationLoading />
							: ''
					}
				</div>
			</div>
		</div>
	)
}
