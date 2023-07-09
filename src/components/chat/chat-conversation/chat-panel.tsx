import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SendIcon from '@mui/icons-material/Send';
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { Popover } from '@mui/material';
import { socket } from 'utils/socket.io';
import { MessageType } from 'types/conversation/message-type';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

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
	const affOpenChat = useSelector(
		(state: RootState) => state.conversation.affOpenChat,
	);
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

	const handleClosePopoverEmoji = () => {
		setPopoverEmojiAnchorEl(null);
		setTimeout(() => {
			inputRef.current?.blur();
			inputRef.current?.focus();
		}, 0);
	};

	const sendMessage = () => {
		socket.emit('send_message', {
			to_id: toId,
			msg: chatValue,
			msg_type: MessageType.TEXT,
		});
		wrapperRef!.current!.style.cssText = `height: 51px`;
		inputRef!.current!.style.cssText = `height: 19px`;
		setChatValue((prev) => {
			actionTyping(prev, '');

			return '';
		});
	};

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
			sendMessage();
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

	useEffect(() => {
		if (affOpenChat) {
			inputRef.current?.focus();
		}
	}, [affOpenChat]);

	const wrapperRefBounding = wrapperRef.current?.getBoundingClientRect();

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
					onFocus={(e) => {
						e.currentTarget.setSelectionRange(
							e.currentTarget.value.length,
							e.currentTarget.value.length,
						);
						e.currentTarget.scrollTo({ top: e.currentTarget.scrollHeight });
					}}
					onChange={(e) =>
						setChatValue((prev) => {
							inputRef!.current!.style.cssText = 'height: 19px';
							wrapperRef!.current!.style.cssText = 'height: 51px';
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
				<SendIcon
					className={[styles.sendIcon, chatValue ? styles.active : ''].join(
						' ',
					)}
					onClick={() => sendMessage()}
				/>
				<Popover
					id={popoverEmojiId}
					open={openPopoverEmoji && !!wrapperRefBounding}
					onClose={handleClosePopoverEmoji}
					container={document.body}
					anchorPosition={{
						top: (wrapperRefBounding?.top ?? 0) - 360,
						left: (wrapperRefBounding?.right ?? 0) - 340,
					}}
					anchorReference="anchorPosition"
				>
					<EmojiPicker
						onEmojiClick={onClickEmojiIcon}
						width={300}
						height={350}
						searchDisabled
						skinTonesDisabled
						emojiStyle={EmojiStyle['NATIVE']}
						previewConfig={{ showPreview: false }}
					/>
				</Popover>
			</div>
		</div>
	);
};
export default memo(ChatPanel);
