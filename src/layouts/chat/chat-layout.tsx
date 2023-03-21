import React from 'react'
import styles from './styles.module.scss'
import Affiliate from '../../types/affiliate-chat'
import {AffiliateChatSkeleton, AffiliateChat} from '../../components/affiliate'
import {Skeleton} from '@mui/material'
import SearchBox from './components/search-box'

interface Props {
	affiliates: Affiliate[],
	loadingAffiliate: boolean;
	loadingConversation: boolean;
	activeConversation: number | null;
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
				active={affiliate.id === activeConversation}
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

				</div>
			</div>
			<div className={styles.body}>
				<ul className={styles.affiliateList}>
					{loadingAffiliate ? <AffiliateChatSkeleton/> : affiliateList()}
				</ul>
				<div className={styles.conversation}>
					{
						loadingConversation
							? <Skeleton animation="wave"/>
							: 'Loaded'
					}
				</div>
			</div>
		</div>
	)
}
