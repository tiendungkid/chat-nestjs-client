import React, {memo, useCallback} from 'react'
import {AffiliateChat, AffiliateChatSkeleton} from '../affiliate'
import {useDispatch, useSelector} from 'react-redux'
import {
	selectAffiliates,
	selectCurrentAffiliate,
	selectLoadingAffiliateList, setChatMessages,
	setLoadingConversation
} from 'store/reducers/conversationSlice'
import {setCurrentAffiliate} from 'store/reducers/conversationSlice'
import Affiliate from 'types/affiliate-chat'
import {chatMessages} from 'components/chat/test'

export default memo(function AffiliateList() {
	const dispatch = useDispatch()
	const loadingAffiliate = useSelector(selectLoadingAffiliateList)
	const currentAffiliate = useSelector(selectCurrentAffiliate)
	const affiliates = useSelector(selectAffiliates)

	const onAffiliateClicked = useCallback((affiliate: Affiliate | null) => {
		dispatch(setCurrentAffiliate(affiliate))
		dispatch(setLoadingConversation(true))

		const timeout = setTimeout(() => {
			dispatch(setLoadingConversation(false))
			dispatch(setChatMessages(chatMessages))
			clearTimeout(timeout)
		}, 3000)
	}, [affiliates])

	if (loadingAffiliate) return <AffiliateChatSkeleton/>

	console.log('render affiliates')
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
