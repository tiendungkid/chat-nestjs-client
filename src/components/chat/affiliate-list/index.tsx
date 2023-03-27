import React, {memo} from 'react'
import Affiliate from 'types/affiliate-chat'
import {AffiliateChat, AffiliateChatSkeleton} from '../affiliate'

interface Props {
    affiliates: Affiliate[];
    loading: boolean;
    currentAffiliate: Affiliate | null;
    onAffiliateClicked: (affiliate: Affiliate) => void;
}

export default memo(function AffiliateList(props: Props) {
	const {affiliates, loading, currentAffiliate, onAffiliateClicked} = props
	console.log('Affiliate list rendered')
	if (loading) {
		return <AffiliateChatSkeleton/>
	}

	return (
		<>
			{
				affiliates.map(affiliate => (
					<AffiliateChat
						key={affiliate.id}
						id={affiliate.id}
						affiliateName={affiliate.name}
						avatar={affiliate.avatar}
						latestChat={affiliate.latestChat}
						active={affiliate.id === currentAffiliate?.id}
						onClick={() => onAffiliateClicked(affiliate)}
					/>))
			}
		</>
	)
})
