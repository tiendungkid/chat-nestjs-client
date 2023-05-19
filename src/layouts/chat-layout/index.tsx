import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import SearchBox from 'components/chat/search-box';
import AffiliateHeader from 'components/chat/affiliate-header';
import ChatConversation from 'components/chat/chat-conversation';
import { DeviceMode } from 'types/device-mode';
import AffiliateList from 'components/chat/affiliate-list';
import { useDispatch, useSelector } from 'react-redux';
import { selectDeviceMode, setDeviceMode } from 'store/reducers/screenSlice';
import { useWindowSize } from 'hooks/window';
import { MOBILE_BREAK_POINT } from 'utils/constants/screen';
import { AffiliateRowResponse } from 'types/response-instances/affiliates-response';
import { socket } from 'utils/socket.io';

export default function ChatLayout() {
	const dispatch = useDispatch();
	const deviceMode = useSelector(selectDeviceMode);
	const screenSize = useWindowSize();
	const [selectedAff, setSelectedAff] = useState<
		AffiliateRowResponse | undefined
	>(undefined);

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
			<div className={styles.header}>
				<SearchBox />
				<AffiliateHeader />
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
						<ChatConversation key={selectedAff.id} selectedAff={selectedAff} />
					)}
				</div>
			</div>
		</div>
	);
}
