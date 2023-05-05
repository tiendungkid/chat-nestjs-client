import React, {memo, useCallback, useEffect, useMemo, useState} from 'react'
import {AffiliateChat} from '../affiliate'
import {useDispatch, useSelector} from 'react-redux'
import {
	selectCurrentAffiliate,
	selectSearchAffiliateQuery, setChatMessages,
	setCurrentAffiliate,
	setLoadingConversation,
} from 'store/reducers/conversationSlice'
import Affiliate, {AffiliateChatStatus} from 'types/affiliate-chat'
import {selectDeviceMode, setDeviceMode} from 'store/reducers/screenSlice'
import {DeviceMode} from 'types/device-mode'
import styles from './styles.module.scss'
import AffiliateSkeleton from '../affiliate/skeleton'
import {useSearchAffiliate} from 'services/affiliates/query'
import {convertAffiliateFromResponse} from 'utils/affiliate-chat-utils/helpers'
import {AffiliatesResponse} from 'types/response-instances/affiliates-response'
import {InfiniteData} from 'react-query'
import {useMarkAsAllReadMutation} from 'services/chat/mutation'
import {chatMessages} from '../test'

export default memo(function AffiliateList() {
	const dispatch = useDispatch()
	const currentAffiliate = useSelector(selectCurrentAffiliate)
	const searchAffiliateQuery = useSelector(selectSearchAffiliateQuery)
	const deviceMode = useSelector(selectDeviceMode)
	const markAsAllReadMutation = useMarkAsAllReadMutation()
	const [affiliates, setAffiliates] = useState<Affiliate[]>([])
	const [page, setPage] = useState(1)

	const {data, isLoading} = useSearchAffiliate({
		query: searchAffiliateQuery,
		page
	}, {
		onSuccess(response: InfiniteData<AffiliatesResponse>) {
			setAffiliates((prevAffiliates) => {
				if (searchAffiliateQuery && page === 1) {
					return convertAffiliateFromResponse(response.pages?.[0] || [])
				}
				return [
					...prevAffiliates,
					...convertAffiliateFromResponse(response.pages?.[0] || [])
				]
			})
		}
	})

	useEffect(() => {
		if (!searchAffiliateQuery) {
			setAffiliates([])
		}
		setPage(1)
	}, [searchAffiliateQuery])

	const scrollAffiliateListHandler = useCallback((e: React.UIEvent<HTMLUListElement>) => {
		const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight
		if (!bottom) return
		if (data?.pages?.[0].nextPage) setPage(data?.pages?.[0].nextPage)
	}, [data])

	const onAffiliateClicked = useCallback((clickedAffiliate: Affiliate) => {
		if (clickedAffiliate.id === currentAffiliate?.id && deviceMode !== DeviceMode.MOBILE_AFFILIATE) return
		const clickedAffiliateIndex = affiliates.findIndex(aff => clickedAffiliate.id === aff.id)
		const affiliateListCurrent = affiliates
		if (clickedAffiliateIndex !== -1) {
			affiliateListCurrent[clickedAffiliateIndex].latestMessage = clickedAffiliate.latestMessage
				? {...clickedAffiliate.latestMessage, status: AffiliateChatStatus.READ}
				: undefined
			setAffiliates(affiliateListCurrent)
			markAsAllReadMutation.mutateAsync(clickedAffiliate.id).then()
		}
		dispatch(setCurrentAffiliate(clickedAffiliate))
		dispatch(setChatMessages(chatMessages))
		// dispatch(setLoadingConversation(true))

		if (deviceMode === DeviceMode.MOBILE_AFFILIATE) dispatch(setDeviceMode(DeviceMode.MOBILE_CONVERSATION))
	}, [deviceMode, currentAffiliate, affiliates, data])

	const affiliateList = useMemo(() => {
		return (
			<>
				{
					affiliates && affiliates.map(affiliate => (
						<AffiliateChat
							key={`${affiliate.id}-${searchAffiliateQuery}`}
							id={affiliate.id}
							affiliateName={affiliate.name}
							avatar={affiliate.avatar}
							active={affiliate.id === currentAffiliate?.id}
							onClick={() => onAffiliateClicked(affiliate)}
							latestMessage={affiliate.latestMessage}
						/>))
				}
				{
					isLoading && [1, 2, 3].map(skeletonIndex => (
						<AffiliateSkeleton key={`skeleton-${skeletonIndex}`} id={skeletonIndex}/>
					))
				}
			</>
		)
	}, [affiliates, currentAffiliate, isLoading])
	// console.log('render affiliates')
	return (
		<ul className={[styles[deviceMode], styles.container].join(' ')} onScroll={scrollAffiliateListHandler}>
			{affiliateList}
		</ul>
	)
})
