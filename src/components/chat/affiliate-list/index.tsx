import React, {memo, useCallback, useEffect} from 'react'
import {AffiliateChat, AffiliateChatSkeleton} from '../affiliate'
import {useDispatch, useSelector} from 'react-redux'
import {
	selectAffiliates,
	selectCurrentAffiliate,
	selectLoadingAffiliateList, selectSearchAffiliateQuery, setAffiliates, setChatMessages, setLoadingAffiliateList,
	setLoadingConversation
} from 'store/reducers/conversationSlice'
import {setCurrentAffiliate} from 'store/reducers/conversationSlice'
import Affiliate from 'types/affiliate-chat'
import {chatMessages} from 'components/chat/test'
import {useSearchAffiliate} from 'services/affiliates/query'
import {parseAffiliateListByResponse} from 'utils/affiliate-chat-utils/helpers'

export default memo(function AffiliateList() {
	const dispatch = useDispatch()
	const loadingAffiliate = useSelector(selectLoadingAffiliateList)
	const currentAffiliate = useSelector(selectCurrentAffiliate)
	const affiliates = useSelector(selectAffiliates)
	const searchAffiliateQuery = useSelector(selectSearchAffiliateQuery)

	const { data } = useSearchAffiliate({query: searchAffiliateQuery, page: 0})

	const onAffiliateClicked = useCallback((affiliate: Affiliate | null) => {
		dispatch(setCurrentAffiliate(affiliate))
		dispatch(setLoadingConversation(true))

		const timeout = setTimeout(() => {
			dispatch(setLoadingConversation(false))
			dispatch(setChatMessages(chatMessages))
			clearTimeout(timeout)
		}, 3000)
	}, [affiliates])


	useEffect(() => {
		if (!data) return
		dispatch(setLoadingAffiliateList(false))
		dispatch(setAffiliates(parseAffiliateListByResponse(data)))
	}, [data])

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
