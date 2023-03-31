import React, {memo, useCallback, useEffect} from 'react'
import {AffiliateChat, AffiliateChatSkeleton} from '../affiliate'
import {useDispatch, useSelector} from 'react-redux'
import {
	selectAffiliates,
	selectCurrentAffiliate,
	selectLoadingAffiliateList,
	selectSearchAffiliateQuery,
	setAffiliates,
	setChatMessages,
	setCurrentAffiliate,
	setLoadingAffiliateList,
	setLoadingConversation
} from 'store/reducers/conversationSlice'
import Affiliate from 'types/affiliate-chat'
import {chatMessages} from 'components/chat/test'
import {useSearchAffiliate} from 'services/affiliates/query'
import {parseAffiliateListByResponse} from 'utils/affiliate-chat-utils/helpers'
import {selectDeviceMode, setDeviceMode} from 'store/reducers/screenSlice'
import {DeviceMode} from 'types/device-mode'
import {useInfiniteScroll} from 'ahooks'
import {searchAffiliate} from 'services/affiliates/services'
import styles from './styles.module.scss'

export default memo(function AffiliateList() {
	const dispatch = useDispatch()
	const loadingAffiliate = useSelector(selectLoadingAffiliateList)
	const currentAffiliate = useSelector(selectCurrentAffiliate)
	const affiliates = useSelector(selectAffiliates)
	const searchAffiliateQuery = useSelector(selectSearchAffiliateQuery)
	const deviceMode = useSelector(selectDeviceMode)

	const {data} = useSearchAffiliate({query: searchAffiliateQuery, page: 0})
	const {data: tData} = useInfiniteScroll(
		() => searchAffiliate({query: searchAffiliateQuery, page: 0}),
		{}
	)

	const onAffiliateClicked = useCallback((affiliate: Affiliate | null) => {
		if (affiliate?.id === currentAffiliate?.id) return
		dispatch(setCurrentAffiliate(affiliate))
		dispatch(setLoadingConversation(true))

		if (deviceMode === DeviceMode.MOBILE_AFFILIATE) {
			dispatch(setDeviceMode(DeviceMode.MOBILE_CONVERSATION))
		}

		const timeout = setTimeout(() => {
			dispatch(setLoadingConversation(false))
			dispatch(setChatMessages(chatMessages))
			clearTimeout(timeout)
		}, 1e3)
	}, [affiliates, deviceMode, currentAffiliate])


	useEffect(() => {
		if (!data) return
		dispatch(setLoadingAffiliateList(false))
		dispatch(setAffiliates(parseAffiliateListByResponse(data)))
	}, [data])

	if (loadingAffiliate) return <AffiliateChatSkeleton/>

	console.log('render affiliates')
	return (
		<ul className={[styles[deviceMode], styles.container].join(' ')}>
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
		</ul>
	)
})
