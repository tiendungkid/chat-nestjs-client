import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {EmojiClickData} from 'emoji-picker-react'
import {Popover} from '@mui/material'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import ImageIcon from '@mui/icons-material/Image'
import {useDropzone} from 'react-dropzone'

import {DropzoneOverlay, ImagePreviewDialog, ChatMessage, NotAllowFileTypeDialog} from '..'
import styles from './styles.module.scss'
import Affiliate from 'types/affiliate-chat'
import {Sender} from 'types/conversation/sender'
import {ChatMessage as Message} from 'types/conversation/chat-message'
import {groupChatMessages} from 'utils/affiliate-chat-utils/helpers'
import {MessageType} from 'types/conversation/message-type'
import {ALLOW_IMAGE_EXTENSIONS} from 'utils/constants/files'
import {pushNewMessage, selectChatMessages} from 'store/reducers/conversationSlice'
import ConversationLoading from '../conversation-loading'

const EmojiPicker = React.lazy(() => import('emoji-picker-react'))

interface Props {
    affiliate: Affiliate | null
    chatValue: string
    setChatValue: (text: string) => void
    loading: boolean
}

const ChatConversation = (props: Props) => {
	const {
		affiliate,
		chatValue,
		setChatValue,
		loading
	} = props

	console.log('render chat conversation')

	if (!affiliate) {
		return <></>
	}

	if (loading) {
		return <ConversationLoading/>
	}

	const dispatch = useDispatch()

	// Image preview
	const [openImagePreviewDialog, setOpenImagePreviewDialog] = useState(false)
	const [messageImageUrl, setMessageImageUrl] = useState('')

	// Emoji handler
	const [popoverEmojiAnchorEl, setPopoverEmojiAnchorEl] = React.useState<Element | null>(null)
	const openPopoverEmoji = Boolean(popoverEmojiAnchorEl)
	const popoverEmojiId = openPopoverEmoji ? 'emoji-popover' : undefined
	const onClickEmojiIcon = (emoji: EmojiClickData) => setChatValue(chatValue + emoji.emoji)
	const handleClosePopoverEmoji = () => setPopoverEmojiAnchorEl(null)
	const handleClickPopoverEmoji = (event: React.MouseEvent) => setPopoverEmojiAnchorEl(event.currentTarget)

	// Upload file handler
	const [openNotAllowFileMine, setOpenNotAllowFileMine] = useState(false)
	const onDrop = useCallback((acceptedFiles: any) => {
		const file: File = acceptedFiles[0]
		if (!ALLOW_IMAGE_EXTENSIONS.includes(file.type)) {
			setOpenNotAllowFileMine(true)
		}
	}, [])
	const {open: openDropzone, getRootProps, getInputProps, isDragActive} = useDropzone({
		onDrop,
		noClick: true,
		multiple: false,
	})

	// Chat message handler
	const chatMessages = groupChatMessages(useSelector(selectChatMessages))
	const chatMessageRef = useRef<null | HTMLDivElement>(null)
	const handleSendMessage = useCallback(() => {
		if (!chatValue) return
		const newMessage: Message = {
			id: new Date().getTime(),
			message: chatValue,
			message_type: MessageType.TEXT,
			sent_at: new Date().toDateString(),
			sender: Sender.MERCHANT,
			read: false
		}
		dispatch(pushNewMessage(newMessage))
		setChatValue('')
	}, [chatValue])

	useEffect(() => {
		chatMessageRef.current?.scrollTo(0, chatMessageRef.current?.scrollHeight)
	}, [chatMessages])


	return (
		<React.Fragment>
			<div className={styles.container}  {...getRootProps()}>
				<input {...getInputProps()} />
				<DropzoneOverlay open={isDragActive}/>
				<div className={styles.conversation} ref={chatMessageRef}>
					{
						chatMessages.map((chatList, index) => (
							<ChatMessage key={index}
								affiliateName={affiliate.name}
								avatar={affiliate.avatar}
								messages={chatList}
								side={chatList?.[0].sender === Sender.MERCHANT ? 'right' : 'left'}
								setOpenImagePreviewDialog={setOpenImagePreviewDialog}
								setMessageImageUrl={setMessageImageUrl}
							/>
						))
					}
				</div>
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
							onKeyDown={event => event.key === 'Enter' && handleSendMessage()}
							onChange={e => setChatValue(e.target.value)}/>
						<SentimentSatisfiedAltIcon onClick={handleClickPopoverEmoji} className={styles.emojiPicker}/>
					</div>
				</div>
			</div>
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
			<ImagePreviewDialog
				open={openImagePreviewDialog}
				imageUrl={messageImageUrl}
				setOpen={setOpenImagePreviewDialog}
			/>
			<NotAllowFileTypeDialog open={openNotAllowFileMine} setOpen={setOpenNotAllowFileMine}/>
		</React.Fragment>
	)
}

export default ChatConversation
