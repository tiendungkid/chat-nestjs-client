import React, {useCallback, useEffect, useRef, useState} from 'react'
import styles from './styles.module.scss'
import EmojiPicker, {EmojiClickData} from 'emoji-picker-react'
import {Popover} from '@mui/material'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import ImageIcon from '@mui/icons-material/Image'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import {useDropzone} from 'react-dropzone'
import DropzoneOverlay from '../dropzon-overlay'
import ChatMessage from '../chat-message/chat-message'
import Affiliate from 'types/affiliate-chat'
import {Sender} from 'types/conversation/sender'
import ImagePreviewDialog from 'components/chat/image-preview-dialog'
import {useDispatch, useSelector} from 'react-redux'
import {
	pushJustSentMessage,
	selectChatMessages,
	selectJustPushNewMessage,
	setJustPushNewMessage
} from 'store/reducers/conversationSlice'
import {groupChatMessages} from 'utils/affiliate-chat-utils/helpers'
import {ChatMessage as Message} from 'types/conversation/chat-message'
import {MessageType} from 'types/conversation/message-type'
import {ALLOW_IMAGE_EXTENSIONS} from 'utils/constants/files'
import NotAllowFileTypeDialog from '../not-allow-file-type-dialog'

interface Props {
	affiliate: Affiliate,
	chatValue: string;
	setChatValue: (text: string) => void
}

const ChatConversation = (props: Props) => {
	const {
		affiliate,
		chatValue,
		setChatValue
	} = props

	const dispatch = useDispatch()
	const [openImagePreviewDialog, setOpenImagePreviewDialog] = useState(false)
	const [messageImageUrl, setMessageImageUrl] = useState('')
	const [anchorEl, setAnchorEl] = React.useState<Element | null>(null)
	const chatMessageRef = useRef<null | HTMLDivElement>(null)
	const handleClick = (event: React.MouseEvent) => setAnchorEl(event.currentTarget)
	const handleClose = () => setAnchorEl(null)
	const chatMessages = groupChatMessages(useSelector(selectChatMessages))
	const justPushNewMessage = useSelector(selectJustPushNewMessage)

	const open = Boolean(anchorEl)
	const [openNotAllowFileMine, setOpenNotAllowFileMine] = useState(false)
	const id = open ? 'emoji-popover' : undefined

	const onClickEmojiIcon = (emoji: EmojiClickData) => {
		setChatValue(chatValue + emoji.emoji)
	}

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

	const handleSendMessage = useCallback(() => {
		if (!chatValue) return
		const pendingMessage: Message = {
			id: new Date().getTime(),
			message: chatValue,
			message_type: MessageType.TEXT,
			sent_at: new Date().toDateString(),
			sender: Sender.MERCHANT,
			read: false
		}
		dispatch(pushJustSentMessage(pendingMessage))
		dispatch(setJustPushNewMessage(true))
		setChatValue('')
	}, [chatValue])

	useEffect(() => {
		if (justPushNewMessage) {
			chatMessageRef.current?.scrollTo(0, chatMessageRef.current?.scrollHeight)
			dispatch(setJustPushNewMessage(false))
		}
	}, [justPushNewMessage])

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
						<SentimentSatisfiedAltIcon onClick={handleClick} className={styles.emojiPicker}/>
					</div>
				</div>
			</div>
			<Popover
				id={id}
				open={open}
				onClose={handleClose}
				anchorEl={anchorEl}
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
