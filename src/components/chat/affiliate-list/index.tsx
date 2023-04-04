import React, {memo, useCallback, useRef} from 'react'
import {AffiliateChat} from '../affiliate'
import {useDispatch, useSelector} from 'react-redux'
import {
	selectAffiliates,
	selectCurrentAffiliate,
	selectSearchAffiliateQuery,
	setChatMessages,
	setCurrentAffiliate,
	setLoadingConversation, setSearchAffiliateQuery
} from 'store/reducers/conversationSlice'
import Affiliate from 'types/affiliate-chat'
import {chatMessages} from 'components/chat/test'
import {parseAffiliateListByResponse} from 'utils/affiliate-chat-utils/helpers'
import {selectDeviceMode, setDeviceMode} from 'store/reducers/screenSlice'
import {DeviceMode} from 'types/device-mode'
import {useInfiniteScroll} from 'ahooks'
import {searchAffiliate} from 'services/affiliates/services'
import styles from './styles.module.scss'
import AffiliateSkeleton from '../affiliate/skeleton'

export default memo(function AffiliateList() {
	const dispatch = useDispatch()
	const currentAffiliate = useSelector(selectCurrentAffiliate)
	const affiliates = useSelector(selectAffiliates)
	const searchAffiliateQuery = useSelector(selectSearchAffiliateQuery)
	const deviceMode = useSelector(selectDeviceMode)
	const affiliateListRef = useRef<HTMLUListElement>(null)

	const {data, loadingMore} = useInfiniteScroll(
		() => searchAffiliate(searchAffiliateQuery),
		{
			target: affiliateListRef,
			isNoMore: (dataList) => {
				return dataList?.count === dataList?.list.length || dataList?.list.length === 0
			},
			onFinally: ()=> {
				dispatch(setSearchAffiliateQuery({
					...searchAffiliateQuery,
					page: searchAffiliateQuery.page + 1
				}))
			},
			reloadDeps: [searchAffiliateQuery.query]
		}
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

	console.log('render affiliates')
	return (
		<ul className={[styles[deviceMode], styles.container].join(' ')} ref={affiliateListRef}>
			{
				data && parseAffiliateListByResponse(data).map(affiliate => (
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
			{
				loadingMore && [1, 2, 3].map(skeletonIndex => (
					<AffiliateSkeleton key={`skeleton-${skeletonIndex}`} id={skeletonIndex}/>
				))
			}
		</ul>
	)
})
