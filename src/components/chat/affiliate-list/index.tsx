import React, {memo, useCallback, useEffect, useState} from 'react'
import {AffiliateChat} from '../affiliate'
import {useDispatch, useSelector} from 'react-redux'
import {
	selectCurrentAffiliate,
	selectSearchAffiliateQuery,
	setChatMessages,
	setCurrentAffiliate,
	setLoadingConversation,
} from 'store/reducers/conversationSlice'
import Affiliate from 'types/affiliate-chat'
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
	const [loading, setLoading] = useState(true)
	const [affiliates, setAffiliates] = useState<Affiliate[]>([])
	const {data, isLoading} = useSearchAffiliate(searchAffiliateQuery)

	useEffect(() => {
		setLoading(isLoading)
	}, [isLoading])

	useEffect(() => {
		if (!data) return
		setAffiliates(convertAffiliateFromResponse(data))
	}, [data])

	const onAffiliateClicked = useCallback((affiliate: Affiliate | null) => {
		if (affiliate?.id === currentAffiliate?.id && deviceMode !== DeviceMode.MOBILE_AFFILIATE) return

		dispatch(setCurrentAffiliate(affiliate))
		dispatch(setLoadingConversation(true))

		if (deviceMode === DeviceMode.MOBILE_AFFILIATE) dispatch(setDeviceMode(DeviceMode.MOBILE_CONVERSATION))

		const timeout = setTimeout(() => {
			dispatch(setLoadingConversation(false))
			dispatch(setChatMessages(chatMessages))
			clearTimeout(timeout)
		}, 1e3)
	}, [deviceMode, currentAffiliate])

	const scrollAffiliateListHandler = useCallback((e: React.UIEvent<HTMLUListElement>) => {
		const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight
		if (bottom) setLoading(true)
	}, [])

	console.log('render affiliates')


	return (
		<ul className={[styles[deviceMode], styles.container].join(' ')} onScroll={scrollAffiliateListHandler}>
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
				loading && [1, 2, 3].map(skeletonIndex => (
					<AffiliateSkeleton key={`skeleton-${skeletonIndex}`} id={skeletonIndex}/>
				))
			}
		</ul>
	)
})
