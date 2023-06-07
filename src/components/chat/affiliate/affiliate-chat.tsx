import React, { forwardRef } from 'react';
import { Avatar, Badge } from '@mui/material';
import styles from './styles.module.scss';
import {
	splitLatestChat,
	stringAvatar,
} from 'utils/affiliate-chat-utils/helpers';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
	AffiliateAccType,
	AffiliateChatStatus,
	AffiliateMessage,
} from 'types/affiliate-chat';

interface Props {
	id: number;
	avatar?: string | null;
	affiliateName: string;
	active?: boolean;
	onClick: (id: number) => void;
	latestMessage?: AffiliateMessage;
}

const AffiliateChat = forwardRef<any, Props>(function (props, ref?) {
	const { id, avatar, affiliateName, active, onClick, latestMessage } = props;
	const classes = [styles.container];
	if (active) classes.push(styles.active);

	let hasUnreadMessage = false;

	if (!latestMessage) {
		classes.push(styles.notChatYet);
	}

	if (
		latestMessage &&
		[AffiliateChatStatus.SEND, AffiliateChatStatus.READ_NOTIFY].includes(
			latestMessage.status,
		) &&
		latestMessage.acc_send === AffiliateAccType.AFFILIATE &&
		!active
	) {
		hasUnreadMessage = true;
		classes.push(styles.unread);
	}

	return (
		<li ref={ref} className={classes.join(' ')} onClick={() => onClick(id)}>
			{avatar ? (
				<Avatar alt={affiliateName} src={avatar} className={styles.avatar} />
			) : (
				<Avatar
					{...stringAvatar(affiliateName)}
					className={styles.avatar}
				></Avatar>
			)}
			<div className={styles.contentWrapper}>
				<div className={styles.content}>
					<div className={styles.affiliateName}>{affiliateName}</div>
					<div className={styles.latestChat}>
						{latestMessage?.acc_send === 'merchant' && 'Me: '}
						{splitLatestChat(
							affiliateName,
							latestMessage?.msg_type === 'text' ||
								latestMessage?.msg_type === 'typing'
								? latestMessage?.msg
								: (latestMessage?.msg_type === 'img'
										? 'Sent a photo'
										: 'Sent a file') || '',
						)}
					</div>
				</div>
				{hasUnreadMessage && (
					<Badge
						color="secondary"
						className={styles.unreadBadge}
						variant="dot"
						invisible={true}
					>
						<FiberManualRecordIcon color={'info'} fontSize="small" />
					</Badge>
				)}
			</div>
		</li>
	);
});

export default AffiliateChat;
