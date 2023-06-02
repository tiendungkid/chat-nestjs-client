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
import { selectSearchAffiliateQuery } from 'store/reducers/conversationSlice';
import { selectDeviceMode, setDeviceMode } from 'store/reducers/screenSlice';
import styles from './styles.module.scss';
import { useSearchAffiliate } from 'services/affiliates/query';
import {
	AffiliateRowResponse,
	AffiliatesResponse,
} from 'types/response-instances/affiliates-response';
import { flatten, last } from 'lodash';

interface Props {
	changeSelectedAff: (aff: AffiliateRowResponse) => void;
	className?: string;
	selectedAff?: AffiliateRowResponse;
}

export default memo(function AffiliateList(props: Props) {
	const dispatch = useDispatch();
	const { changeSelectedAff, className = '', selectedAff } = props;
	const observer = useRef<IntersectionObserver | null>(null);

	const searchAffiliateQuery = useSelector(selectSearchAffiliateQuery);
	const deviceMode = useSelector(selectDeviceMode);
	const [affiliates, setAffiliates] = useState<AffiliateRowResponse[]>([]);

	const { data, isLoading, fetchNextPage, hasNextPage } = useSearchAffiliate({
		query: searchAffiliateQuery,
	});

	const lastAffiliateRef = useCallback(
		(node: HTMLDivElement) => {
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					setTimeout(() => {
						const lastItemMessageId = last(affiliates)?.latestMessage?.id || -1;
						fetchNextPage({
							pageParam: {
								last_message_id: lastItemMessageId,
								aff_has_message: affiliates.map((v) => v.id),
							},
						});
						observer.current?.unobserve(entries[0].target);
					}, 100);
				}
			});
			if (node) observer.current.observe(node);
		},
		[affiliates],
	);

	useEffect(() => {
		if (!data) return;
		const dataAffPaginate = flatten(data.pages);

		setAffiliates(dataAffPaginate);
	}, [data]);

	return (
		<ul className={[styles[deviceMode], styles.container, className].join(' ')}>
			{affiliates.map((affiliate, index) => (
				<AffiliateChat
					ref={
						hasNextPage && index === affiliates.length - 1
							? lastAffiliateRef
							: undefined
					}
					key={affiliate.id}
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
			))}
		</ul>
	);
});
