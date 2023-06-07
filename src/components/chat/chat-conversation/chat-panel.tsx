import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { Popover } from '@mui/material';
import { socket } from 'utils/socket.io';
import { MessageType } from 'types/conversation/message-type';

// const EmojiPicker = React.lazy(() => import('emoji-picker-react'))

interface Props {
	openDropzone: () => void;
	toId: number;
}

const ChatPanel = (props: Props) => {
	const { openDropzone, toId } = props;
	const [chatValue, setChatValue] = useState('');
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

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
	const onEnterPressed = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key !== 'Enter' || !chatValue.trim()) return;
		if (e.key === 'Enter' && e.altKey) {
			setChatValue((prev) => {
				return prev + '\r\n';
			});
			setTimeout(() => {
				inputRef.current?.blur();
				inputRef.current?.focus();
			}, 0);
		}
		if (e.key === 'Enter' && !e.shiftKey && !e.altKey) {
			e.preventDefault();
			socket.emit('send_message', {
				to_id: toId,
				msg: chatValue,
				msg_type: MessageType.TEXT,
			});
			wrapperRef!.current!.style.cssText = `height: 50px`;
			inputRef!.current!.style.cssText = `height: 18px`;
			setChatValue((prev) => {
				actionTyping(prev, '');

				return '';
			});
		}
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

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<div className={styles.chatPanel} ref={wrapperRef}>
			<div className={styles.media}>
				<div className={styles.mediaOption}>
					<AttachFileIcon className={styles.mediaIcon} onClick={openDropzone} />
				</div>
				<div className={styles.mediaOption}>
					<ImageIcon className={styles.mediaIcon} onClick={openDropzone} />
				</div>
			</div>
			<div className={styles.chatInputGroup}>
				<textarea
					ref={inputRef}
					value={chatValue}
					placeholder="Aa"
					className={styles.chatInput}
					onKeyDown={onEnterPressed}
					wrap="physical"
					onChange={(e) =>
						setChatValue((prev) => {
							inputRef!.current!.style.cssText = 'height: 18px'; // reset after clear text
							wrapperRef!.current!.style.cssText = 'height: 50px';
							const height = Math.min(
								125,
								inputRef?.current?.scrollHeight || 0,
							);
							wrapperRef!.current!.style.cssText = `height: ${height + 32}px`;
							inputRef!.current!.style.cssText = `height: ${height}px`;
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
