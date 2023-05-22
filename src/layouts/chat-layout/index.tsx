import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import SearchBox from 'components/chat/search-box';
import ChatConversation from 'components/chat/chat-conversation';
import { DeviceMode } from 'types/device-mode';
import AffiliateList from 'components/chat/affiliate-list';
import { useDispatch, useSelector } from 'react-redux';
import { selectDeviceMode, setDeviceMode } from 'store/reducers/screenSlice';
import { useWindowSize } from 'hooks/window';
import { MOBILE_BREAK_POINT } from 'utils/constants/screen';
import { AffiliateRowResponse } from 'types/response-instances/affiliates-response';
import { useGetMerchant } from 'services/merchant/query';
import { useGetAffiliate } from 'services/affiliates/query';

interface Props {
	isAff?: boolean;
}

export default function ChatLayout(props: Props) {
	const { isAff = false } = props;
	const dispatch = useDispatch();
	const deviceMode = useSelector(selectDeviceMode);
	const screenSize = useWindowSize();
	const [selectedAff, setSelectedAff] = useState<
		AffiliateRowResponse | undefined
	>(undefined);
	const { data: dataMerchant } = useGetMerchant();
	const { data: dataAffiliate } = useGetAffiliate(isAff);

	useEffect(() => {
		if (!screenSize.width) return;
		const newMode =
			screenSize.width <= MOBILE_BREAK_POINT
				? DeviceMode.MOBILE_AFFILIATE
				: DeviceMode.DESKTOP;
		if (newMode === deviceMode) return;
		dispatch(setDeviceMode(newMode));
	}, [screenSize.width]);

	return (
		<div className={[styles.container, styles[deviceMode]].join(' ')}>
			{isAff && dataMerchant && dataAffiliate && (
				<ChatConversation receiver={dataMerchant} affiliate={dataAffiliate} />
			)}
			{!isAff && (
				<>
					<div className={styles.header}>
						<SearchBox />
						{/* <AffiliateHeader /> */}
					</div>
					<div
						className={`${styles.body} ${
							selectedAff ? styles.showConversation : ''
						}`}
					>
						<AffiliateList
							changeSelectedAff={setSelectedAff}
							className={'aff-list'}
							selectedAff={selectedAff}
						/>
						<div className={`${styles.chatConversation} conversation`}>
							{selectedAff && (
								<ChatConversation
									key={selectedAff.id}
									receiver={selectedAff}
									removeSelectAff={() => setSelectedAff(undefined)}
								/>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
}
