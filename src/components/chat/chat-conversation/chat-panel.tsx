import React, {useCallback, useState} from 'react'
import styles from './styles.module.scss'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import ImageIcon from '@mui/icons-material/Image'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import {EmojiClickData} from 'emoji-picker-react'
import {Popover} from '@mui/material'

const EmojiPicker = React.lazy(() => import('emoji-picker-react'))

interface Props {
    openDropzone: () => void,
}

export default function ChatPanel(props: Props) {
	const {openDropzone} = props
	const [chatValue, setChatValue] = useState('')

	// Emoji handler
	const [popoverEmojiAnchorEl, setPopoverEmojiAnchorEl] = React.useState<Element | null>(null)
	const openPopoverEmoji = Boolean(popoverEmojiAnchorEl)
	const popoverEmojiId = openPopoverEmoji ? 'emoji-popover' : undefined

	const onClickEmojiIcon = useCallback((emoji: EmojiClickData) => {
		setChatValue(chatValue + emoji.emoji)
	}, [chatValue])

	const handleClosePopoverEmoji = () => setPopoverEmojiAnchorEl(null)
	const handleClickPopoverEmoji = (event: React.MouseEvent) => setPopoverEmojiAnchorEl(event.currentTarget)

	// Handle send message
	const onEnterPressed = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== 'Enter') return
		console.log('Pushed new message')
	}, [chatValue])

	return (
		<div className={styles.chatPanel}>
			<div className={styles.media}>
				<div className={styles.mediaOption}>
					<AttachFileIcon className={styles.mediaIcon} onClick={openDropzone}/>
				</div>
				<div className={styles.mediaOption}>
					<ImageIcon className={styles.mediaIcon} onClick={openDropzone}/>
				</div>
			</div>
			<div className={styles.chatInputGroup}>
				<input type="text" value={chatValue} placeholder="Aa" className={styles.chatInput}
					onKeyDown={onEnterPressed}
					onChange={e => setChatValue(e.target.value)}/>
				<SentimentSatisfiedAltIcon onClick={handleClickPopoverEmoji} className={styles.emojiPicker}/>
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
					<EmojiPicker onEmojiClick={onClickEmojiIcon}/>
				</Popover>
			</div>
		</div>
	)
}
