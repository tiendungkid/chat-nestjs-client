import React, {useCallback, useState} from 'react'
import styles from './styles.module.scss'
import EmojiPicker, {EmojiClickData} from 'emoji-picker-react'
import {Popover} from '@mui/material'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useDropzone} from 'react-dropzone'
import DropzoneOverlay from '../dropzon-overlay'
import ChatMessage from '../chat-message/chat-message'
import {ChatMessage as Messages} from 'types/conversation/chat-message'
import Affiliate from 'types/affiliate-chat'
import {Sender} from 'types/conversation/sender'
import ImagePreviewDialog from 'components/chat/image-preview-dialog'

interface Props {
	affiliate: Affiliate,
	chatValue: string;
	setChatValue: (text: string) => void;
	messages: Messages[][]
}

const ChatConversation = (props: Props) => {
	const {
		affiliate,
		chatValue,
		setChatValue,
		messages
	} = props

	const [openImagePreviewDialog, setOpenImagePreviewDialog] = useState(false)
	const [messageImageUrl, setMessageImageUrl] = useState('')
	const [anchorEl, setAnchorEl] = React.useState<Element | null>(null)
	const handleClick = (event: React.MouseEvent) => setAnchorEl(event.currentTarget)
	const handleClose = () => setAnchorEl(null)

	const open = Boolean(anchorEl)
	const id = open ? 'emoji-popover' : undefined

	const onClickEmojiIcon = (emoji: EmojiClickData) => {
		setChatValue(chatValue + emoji.emoji)
	}
	const onDrop = useCallback((acceptedFiles: any) => {
		console.log(acceptedFiles)
	}, [])

	const {open: openDropzone, getRootProps, getInputProps, isDragActive} = useDropzone({
		onDrop,
		noClick: true,
		multiple: false,
	})


	return (
		<React.Fragment>
			<div className={styles.container}  {...getRootProps()}>
				<input {...getInputProps()} />
				<DropzoneOverlay open={isDragActive}/>
				<div className={styles.conversation}>
					{
						messages.map((chatList, index) => (
							<ChatMessage key={index} affiliateName={affiliate.name}
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
							<FontAwesomeIcon icon={['fal', 'paperclip']} className={styles.mediaIcon}
											 onClick={openDropzone}/>
						</div>
						<div className={styles.mediaOption}>
							<FontAwesomeIcon icon={['fal', 'image']} className={styles.mediaIcon}
											 onClick={openDropzone}/>
						</div>
					</div>
					<div className={styles.chatInputGroup}>
						<input type="text" value={chatValue} placeholder="Aa" className={styles.chatInput}
							   onChange={e => setChatValue(e.target.value)}/>
						<FontAwesomeIcon icon={['fal', 'face-smile']} onClick={handleClick}
										 className={styles.emojiPicker}/>
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
		</React.Fragment>
	)
}

export default ChatConversation
