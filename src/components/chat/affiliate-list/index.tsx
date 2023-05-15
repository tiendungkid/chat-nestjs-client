import React, {
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { AffiliateChat } from '../affiliate';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectCurrentAffiliate,
	selectSearchAffiliateQuery,
	setChatMessages,
	setCurrentAffiliate,
	setLoadingConversation,
} from 'store/reducers/conversationSlice';
import Affiliate, { AffiliateChatStatus } from 'types/affiliate-chat';
import { selectDeviceMode, setDeviceMode } from 'store/reducers/screenSlice';
import { DeviceMode } from 'types/device-mode';
import styles from './styles.module.scss';
import AffiliateSkeleton from '../affiliate/skeleton';
import { useSearchAffiliate } from 'services/affiliates/query';
import { convertAffiliateFromResponse } from 'utils/affiliate-chat-utils/helpers';
import {
	AffiliateRowResponse,
	AffiliatesResponse,
} from 'types/response-instances/affiliates-response';
import { useMarkAsAllReadMutation } from 'services/chat/mutation';
import { chatMessages } from '../test';
import { flatten } from 'lodash';

export default memo(function AffiliateList() {
	const dispatch = useDispatch();

	const observer = useRef<IntersectionObserver | null>(null);

	const currentAffiliate = useSelector(selectCurrentAffiliate);
	const searchAffiliateQuery = useSelector(selectSearchAffiliateQuery);
	const deviceMode = useSelector(selectDeviceMode);
	const markAsAllReadMutation = useMarkAsAllReadMutation();
	const [affiliates, setAffiliates] = useState<AffiliateRowResponse[]>([]);

	const { data, isLoading, fetchNextPage, hasNextPage } = useSearchAffiliate({
		query: searchAffiliateQuery,
	});

	const lastAffiliateRef = useCallback((node: HTMLDivElement) => {
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				fetchNextPage();
			}
		});
		if (node) observer.current.observe(node);
	}, []);

	useEffect(() => {
		if (!data) return;
		const dataAffPaginate = flatten(data.pages);
		const dataAff: AffiliateRowResponse[] = dataAffPaginate.reduce(
			(prev: AffiliateRowResponse[], v) => {
				return prev.concat(v.rows);
			},
			[],
		);

		setAffiliates((prev) => {
			return [...prev, ...dataAff];
		});
	}, [data]);

	// useEffect(() => {
	// 	if (!searchAffiliateQuery) {
	// 		setAffiliates([]);
	// 	}
	// 	setPage(1);
	// }, [searchAffiliateQuery]);

	// useEffect(() => {
	// 	if (!data) return;

	// 	setAffiliates((prevAffiliates) => {
	// 		if (searchAffiliateQuery && page === 1) {
	// 			return convertAffiliateFromResponse(data.pages?.[0] || []);
	// 		}
	// 		return [
	// 			...prevAffiliates,
	// 			...convertAffiliateFromResponse(data.pages?.[0] || []),
	// 		];
	// 	});
	// }, [data]);

	// const scrollAffiliateListHandler = useCallback(
	// 	(e: React.UIEvent<HTMLUListElement>) => {
	// 		const bottom =
	// 			e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
	// 			e.currentTarget.clientHeight;
	// 		if (!bottom) return;
	// 		if (data?.pages?.[0].nextPage) setPage(data?.pages?.[0].nextPage);
	// 	},
	// 	[data],
	// );

	// const onAffiliateClicked = useCallback(
	// 	(clickedAffiliate: Affiliate) => {
	// 		if (
	// 			clickedAffiliate.id === currentAffiliate?.id &&
	// 			deviceMode !== DeviceMode.MOBILE_AFFILIATE
	// 		)
	// 			return;
	// 		const clickedAffiliateIndex = affiliates.findIndex(
	// 			(aff) => clickedAffiliate.id === aff.id,
	// 		);
	// 		const affiliateListCurrent = affiliates;
	// 		if (clickedAffiliateIndex !== -1) {
	// 			affiliateListCurrent[clickedAffiliateIndex].latestMessage =
	// 				clickedAffiliate.latestMessage
	// 					? {
	// 							...clickedAffiliate.latestMessage,
	// 							status: AffiliateChatStatus.READ,
	// 					  }
	// 					: undefined;
	// 			setAffiliates(affiliateListCurrent);
	// 			markAsAllReadMutation.mutateAsync(clickedAffiliate.id).then();
	// 		}
	// 		dispatch(setCurrentAffiliate(clickedAffiliate));
	// 		dispatch(setChatMessages(chatMessages));
	// 		// dispatch(setLoadingConversation(true))

	// 		if (deviceMode === DeviceMode.MOBILE_AFFILIATE)
	// 			dispatch(setDeviceMode(DeviceMode.MOBILE_CONVERSATION));
	// 	},
	// 	[deviceMode, currentAffiliate, affiliates, data],
	// );

	// const affiliateList = useMemo(() => {
	// 	return (
	// 		<>
	// 			{affiliates &&
	// 				affiliates.map((affiliate) => (
	// 					<AffiliateChat
	// 						key={`${affiliate.id}-${searchAffiliateQuery}`}
	// 						id={affiliate.id}
	// 						affiliateName={affiliate.name}
	// 						avatar={affiliate.avatar}
	// 						active={affiliate.id === currentAffiliate?.id}
	// 						onClick={() => {
	// 							console.log(1);
	// 						}}
	// 						latestMessage={affiliate.latestMessage}
	// 					/>
	// 				))}
	// 			{isLoading &&
	// 				[1, 2, 3].map((skeletonIndex) => (
	// 					<AffiliateSkeleton
	// 						key={`skeleton-${skeletonIndex}`}
	// 						id={skeletonIndex}
	// 					/>
	// 				))}
	// 		</>
	// 	);
	// }, [affiliates, currentAffiliate, isLoading]);

	return (
		<ul className={[styles[deviceMode], styles.container].join(' ')}>
			{/* {affiliateList} */}
			{affiliates.map((affiliate, index) => (
				<AffiliateChat
					ref={
						hasNextPage && index === affiliates.length - 1
							? lastAffiliateRef
							: undefined
					}
					key={`${affiliate.id}`}
					id={affiliate.id}
					affiliateName={`${affiliate.first_name} ${affiliate.last_name}`}
					avatar={affiliate.avatar}
					active={affiliate.id === currentAffiliate?.id}
					onClick={() => {}}
					latestMessage={affiliate.latestMessage}
				/>
			))}
		</ul>
	);
});
