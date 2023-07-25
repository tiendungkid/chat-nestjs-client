import React, {
	RefObject,
	createRef,
	memo,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { AffiliateChat } from '../affiliate';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectSearchAffiliateQuery,
	setAffIdParam,
	setSearchAffiliateQuery,
} from 'store/reducers/conversationSlice';
import { selectDeviceMode, setDeviceMode } from 'store/reducers/screenSlice';
import styles from './styles.module.scss';
import { useSearchAffiliate } from 'services/affiliates/query';
import { AffiliateRowResponse } from 'types/response-instances/affiliates-response';
import { flatten, last } from 'lodash';
import { RootState } from 'store';
import { DeviceMode } from 'types/device-mode';
import { useMarkAsAllReadMutation } from 'services/chat/mutation';

interface Props {
	changeSelectedAff: (aff: AffiliateRowResponse) => void;
	className?: string;
	selectedAff?: AffiliateRowResponse;
}

export default memo(function AffiliateList(props: Props) {
	const { changeSelectedAff, className = '', selectedAff } = props;
	const observer = useRef<IntersectionObserver | null>(null);
	const listRef = useRef<any>(null);
	const affItemPrev = useRef(0);
	const affIdParamPrev = useRef(0);
	const dispatch = useDispatch();
	const searchAffiliateQuery = useSelector(selectSearchAffiliateQuery);
	const deviceMode = useSelector(selectDeviceMode);
	const [affiliates, setAffiliates] = useState<AffiliateRowResponse[]>([]);
	const affIdParam = useSelector(
		(state: RootState) => state.conversation.affIdParam,
	);
	const isMobile =
		useSelector((state: RootState) => state.screen.deviceMode) ===
		DeviceMode.MOBILE_AFFILIATE;

	const markAsAllReadMutation = useMarkAsAllReadMutation();
	const affiliatesRef = useRef<any>([]);

	const { data, fetchNextPage, hasNextPage, isLoading } = useSearchAffiliate({
		query: searchAffiliateQuery,
	});

	const lastAffiliateRef = useCallback(
		(node: HTMLDivElement) => {
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasNextPage) {
					setTimeout(() => {
						const lastItemMessageId = last(affiliates)?.latestMessage?.id || -1;
						fetchNextPage({
							pageParam: {
								last_message_id: lastItemMessageId,
								aff_has_message: affiliates.map((v) => v.id),
							},
						});
						observer.current?.unobserve(entries[0].target);
					}, 0);
				}
			});
			if (node) observer.current.observe(node);
		},
		[affiliates],
	);

	useEffect(() => {
		if (!data) return;
		const dataAffPaginate = flatten(data.pages);

		if (
			affIdParam > 0 &&
			!dataAffPaginate.find((v) => v.id === +affIdParam) &&
			!searchAffiliateQuery
		) {
			setAffiliates(dataAffPaginate);
			setTimeout(() => {
				listRef.current?.lastChild?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
					inline: 'start',
				});
			}, 0);

			return;
		}

		setAffiliates(dataAffPaginate);
	}, [data, affIdParam, searchAffiliateQuery]);

	useEffect(() => {
		if (!affiliates.length) return;

		if (affItemPrev.current === 0 && !isMobile) {
			changeSelectedAff(affiliates[0]);
		}

		if (
			affIdParam > 0 &&
			affIdParam !== affIdParamPrev.current &&
			affiliates.find((v) => v.id === +affIdParam) &&
			!searchAffiliateQuery
		) {
			changeSelectedAff(
				affiliates.find((v) => v.id === +affIdParam) ?? affiliates[0],
			);

			setTimeout(() => {
				affiliatesRef.current[`aff-${affIdParam}`].current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
					inline: 'start',
				});
			}, 0);

			affIdParamPrev.current = affIdParam;
		}

		affItemPrev.current = affiliates.length;
	}, [affiliates, affIdParam, searchAffiliateQuery]);

	useEffect(() => {
		if (!selectedAff || !selectedAff.latestMessage) return;

		markAsAllReadMutation.mutate(selectedAff?.id);
		window.parent.postMessage(
			{
				type: 'readAll',
				affId: selectedAff?.id,
			},
			'*',
		);

		dispatch(setAffIdParam(-1));
	}, [selectedAff]);

	return (
		<ul
			className={[styles[deviceMode], styles.container, className].join(' ')}
			ref={listRef}
		>
			{affiliates.map((affiliate, index) => {
				return (
					<React.Fragment key={affiliate.id}>
						{index === affiliates.length - 1 && hasNextPage && !isLoading && (
							<div ref={lastAffiliateRef} />
						)}
						<AffiliateChat
							ref={(affiliatesRef.current[`aff-${affiliate.id}`] = createRef())}
							id={affiliate.id}
							affiliateName={`${affiliate.first_name} ${affiliate.last_name}`}
							avatar={affiliate.avatar}
							active={affiliate.id === selectedAff?.id}
							onClick={(id: number) =>
								changeSelectedAff(
									affiliates.find((v) => v.id === id) as AffiliateRowResponse,
								)
							}
							latestMessage={affiliate.latestMessage}
						/>
					</React.Fragment>
				);
			})}
		</ul>
	);
});
