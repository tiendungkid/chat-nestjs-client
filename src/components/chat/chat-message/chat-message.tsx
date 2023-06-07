import React from 'react';
import styles from './styles.module.scss';
import { Avatar, Grid, Tooltip, Typography } from '@mui/material';
import {
	convertTimeSend,
	stringAvatar,
} from 'utils/affiliate-chat-utils/helpers';
import { ChatMessage as Message } from 'types/conversation/chat-message';
import { MessageType } from 'types/conversation/message-type';
import Typing from '../typing';
import ImageMessage from '../image-message';
import FileMessage from '../file-message';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { DeviceMode } from 'types/device-mode';

interface Props {
	affiliateName: string;
	messages: Message[];
	side: 'left' | 'right';
	setMessageImageUrl: (imageUrl: string) => void;
	setOpenImagePreviewDialog: (open: boolean) => void;
}

export default function ChatMessage(props: Props) {
	const {
		affiliateName,
		messages,
		side,
		setMessageImageUrl,
		setOpenImagePreviewDialog,
	} = props;

	const isMobile =
		useSelector((state: RootState) => state.screen.deviceMode) ===
		DeviceMode.MOBILE_AFFILIATE;

	const attachClass = (index: number, side: 'left' | 'right'): string[] => {
		const rowClass =
			index === 0
				? styles[side + 'First']
				: index === messages.length - 1
				? styles[side + 'Last']
				: '';
		return [styles.message, rowClass, styles[side]];
	};
	const onImageMessageClicked = (imageUrl: string) => {
		setMessageImageUrl(imageUrl);
		setOpenImagePreviewDialog(true);
	};

	const renderMessage = (msg: Message, index: number) => {
		if (msg.msg_type === MessageType.TYPING) {
			return (
				<div className={attachClass(index, side).join(' ')}>
					<Typing />
				</div>
			);
		}
		if (msg.msg_type === MessageType.IMAGE) {
			return (
				<ImageMessage message={msg} onImageClick={onImageMessageClicked} />
			);
		}
		if (msg.msg_type === MessageType.FILE) {
			return (
				<FileMessage
					style={side === 'left' ? { marginLeft: 'unset' } : {}}
					message={msg}
				/>
			);
		}
		return (
			<Tooltip title={convertTimeSend(msg.time_send)} placement={'right-start'}>
				<Typography
					align={'left'}
					className={attachClass(index, side).join(' ')}
				>
					{msg.msg}
				</Typography>
			</Tooltip>
		);
	};

	return (
		<Grid
			container
			spacing={2}
			justifyContent={side === 'right' ? 'flex-end' : 'flex-start'}
			className={styles.chatMessage}
		>
			<Grid item xs={10}>
				{messages.map((message, index) => {
					return (
						<div key={message.id} className={styles[side + 'Row']}>
							{renderMessage(message, index)}
						</div>
					);
				})}
			</Grid>
		</Grid>
	);
}
