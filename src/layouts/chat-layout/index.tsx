import React, { useEffect, useRef, useState } from 'react';
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
import { CSSTransition } from 'react-transition-group';
import { RootState } from 'store';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import { useParams } from 'react-router-dom';
import AffiliateHeader from 'components/chat/affiliate-header';
import { useMediaQuery } from 'react-responsive';

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
	const nodeRef = useRef(null);
	const [hidden, setHidden] = useState(false);
	const [animateConversation, setAnimateConversation] = useState(false);
	const isMobile = useMediaQuery({
		query: `(max-width: 450px)`,
	});

	const chatSetting = useSelector(
		(state: RootState) => state.conversation.chatSetting,
	);

	const openSetting = () => {
		window.parent.postMessage('open_setting', '*');
	};

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
					{!!chatSetting && (!selectedAff || !isMobile) && (
						<div className={styles.header}>
							<SearchBox />
							<AffiliateHeader currentAffiliate={selectedAff} />
						</div>
					)}
					<div className={styles.body}>
						{chatSetting ? (
							<>
								<AffiliateList
									changeSelectedAff={(aff) => {
										setAnimateConversation(true);
										setSelectedAff(aff);
									}}
									className={[
										'aff-list',
										// isMobile && hidden ? styles.hidden : '',
									].join(' ')}
									selectedAff={selectedAff}
								/>
								<CSSTransition
									nodeRef={nodeRef}
									in={animateConversation}
									timeout={0}
									classNames="my-node"
									onEnter={() => setHidden(true)}
									onEntered={() => setHidden(false)}
									onExited={() => {
										setSelectedAff(undefined);
									}}
								>
									<div ref={nodeRef} className={`${styles.chatConversation}`}>
										{selectedAff && (
											<ChatConversation
												key={selectedAff.id}
												receiver={selectedAff}
												removeSelectAff={() => {
													setAnimateConversation(false);
												}}
											/>
										)}
									</div>
								</CSSTransition>
							</>
						) : (
							<div className={styles.disabledChat}>
								<SpeakerNotesOffIcon
									color="disabled"
									className={styles.offChatIcon}
								/>
								<span className={styles.offChatText}>
									Chat setting is off, turn it on{' '}
									<span
										className={styles.openSetting}
										onClick={() => openSetting()}
									>
										here.
									</span>
								</span>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}
