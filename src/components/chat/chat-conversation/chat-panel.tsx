import React, { memo, useCallback, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { Popover } from '@mui/material';
import { socket } from 'utils/socket.io';
import { MessageType } from 'types/conversation/message-type';
import { queryClient } from 'services';

// const EmojiPicker = React.lazy(() => import('emoji-picker-react'))

interface Props {
	openDropzone: () => void;
	toId: number;
}

const ChatPanel = (props: Props) => {
	const { openDropzone, toId } = props;
	const [chatValue, setChatValue] = useState('');

	// Emoji handler
	const [popoverEmojiAnchorEl, setPopoverEmojiAnchorEl] =
		React.useState<Element | null>(null);
	const openPopoverEmoji = Boolean(popoverEmojiAnchorEl);
	const popoverEmojiId = openPopoverEmoji ? 'emoji-popover' : undefined;

	const onClickEmojiIcon = (emoji: EmojiClickData) => {
		setChatValue((prev) => {
			const result = prev + emoji.emoji;
			actionTyping(prev, result);

			return result;
		});
	};

	const handleClosePopoverEmoji = () => setPopoverEmojiAnchorEl(null);
	const handleClickPopoverEmoji = (event: React.MouseEvent) =>
		setPopoverEmojiAnchorEl(event.currentTarget);

	// Handle send message
	const onEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== 'Enter') return;
		socket.emit('send_message', {
			to_id: toId,
			msg: chatValue,
			msg_type: MessageType.TEXT,
		});

		setChatValue((prev) => {
			actionTyping(prev, '');

			return '';
		});
	};

	const actionTyping = (prevValue: string, nextValue: string) => {
		if (prevValue && !nextValue) {
			socket.emit('un-typing', {
				to_id: toId,
			});
		} else if (!prevValue && nextValue) {
			socket.emit('typing', {
				to_id: toId,
			});
		}
	};

	return (
		<div className={styles.chatPanel}>
			<div className={styles.media}>
				<div className={styles.mediaOption}>
					<AttachFileIcon className={styles.mediaIcon} onClick={openDropzone} />
				</div>
				<div className={styles.mediaOption}>
					<ImageIcon className={styles.mediaIcon} onClick={openDropzone} />
				</div>
			</div>
			<div className={styles.chatInputGroup}>
				<input
					type="text"
					value={chatValue}
					placeholder="Aa"
					className={styles.chatInput}
					onKeyDown={onEnterPressed}
					onChange={(e) =>
						setChatValue((prev) => {
							actionTyping(prev, e.target.value);

							return e.target.value;
						})
					}
				/>
				<SentimentSatisfiedAltIcon
					onClick={handleClickPopoverEmoji}
					className={styles.emojiPicker}
				/>
				<Popover
					id={popoverEmojiId}
					open={openPopoverEmoji}
					onClose={handleClosePopoverEmoji}
					anchorEl={popoverEmojiAnchorEl}
					anchorOrigin={{
						vertical: 'center',
						horizontal: 'center',
					}}
				>
					<EmojiPicker onEmojiClick={onClickEmojiIcon} />
				</Popover>
			</div>
		</div>
	);
};
export default memo(ChatPanel);
