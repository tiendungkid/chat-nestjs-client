import React, {memo, useCallback, useEffect, useMemo, useState} from 'react'
import {AffiliateChat} from '../affiliate'
import {useDispatch, useSelector} from 'react-redux'
import {
	selectCurrentAffiliate,
	selectSearchAffiliateQuery,
	setChatMessages,
	setCurrentAffiliate,
	setLoadingConversation,
} from 'store/reducers/conversationSlice'
import Affiliate, {AffiliateChatStatus} from 'types/affiliate-chat'
import {chatMessages} from 'components/chat/test'
import {selectDeviceMode, setDeviceMode} from 'store/reducers/screenSlice'
import {DeviceMode} from 'types/device-mode'
import styles from './styles.module.scss'
import AffiliateSkeleton from '../affiliate/skeleton'
import {useSearchAffiliate} from 'services/affiliates/query'
import {convertAffiliateFromResponse} from '../../../utils/affiliate-chat-utils/helpers'

export default memo(function AffiliateList() {
	const dispatch = useDispatch()
	const currentAffiliate = useSelector(selectCurrentAffiliate)
	const searchAffiliateQuery = useSelector(selectSearchAffiliateQuery)
	const deviceMode = useSelector(selectDeviceMode)
	const [affiliates, setAffiliates] = useState<Affiliate[]>([])
	const [page, setPage] = useState(1)

	const {data, isLoading, refetch} = useSearchAffiliate({
		query: searchAffiliateQuery,
		page
	})

	useEffect(() => {
		if (!data) return
		setAffiliates([
			...affiliates,
			...convertAffiliateFromResponse(data.pages?.[0] || [])
		])
	}, [data, searchAffiliateQuery])

	useEffect(() => {
		setAffiliates(() => [])
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
		if (clickedAffiliateIndex !== -1) {
			affiliates[clickedAffiliateIndex].latestMessage = clickedAffiliate.latestMessage
				? {...clickedAffiliate.latestMessage, status: AffiliateChatStatus.READ}
				: undefined
			setAffiliates(affiliates)
		}
		dispatch(setCurrentAffiliate(clickedAffiliate))
		dispatch(setLoadingConversation(true))
		if (deviceMode === DeviceMode.MOBILE_AFFILIATE) dispatch(setDeviceMode(DeviceMode.MOBILE_CONVERSATION))

		const timeout = setTimeout(() => {
			dispatch(setLoadingConversation(false))
			dispatch(setChatMessages(chatMessages))
			clearTimeout(timeout)
		}, 1e3)
	}, [deviceMode, currentAffiliate, affiliates])

	// console.log('render affiliates')

	const renderAffiliateList = useMemo(() => {
		return (
			<>
				{
					affiliates && affiliates.map(affiliate => (
						<AffiliateChat
							key={affiliate.id}
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

	return (
		<ul className={[styles[deviceMode], styles.container].join(' ')} onScroll={scrollAffiliateListHandler}>
			{renderAffiliateList}
		</ul>
	)
})
