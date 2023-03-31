import React, {useCallback, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {useDropzone} from 'react-dropzone'
import {DropzoneOverlay, ImagePreviewDialog, ChatMessage, NotAllowFileTypeDialog} from '..'
import styles from './styles.module.scss'
import {Sender} from 'types/conversation/sender'
import {groupChatMessages} from 'utils/affiliate-chat-utils/helpers'
import {ALLOW_IMAGE_EXTENSIONS} from 'utils/constants/files'
import {
	selectChatMessages,
	selectCurrentAffiliate,
	selectLoadingConversation,
} from 'store/reducers/conversationSlice'
import ConversationLoading from '../conversation-loading'
import ChatPanel from './chat-panel'
import {selectDeviceMode} from 'store/reducers/screenSlice'

const ChatConversation = () => {

	const deviceMode = useSelector(selectDeviceMode)
	const currentAffiliate = useSelector(selectCurrentAffiliate)
	const loading = useSelector(selectLoadingConversation)

	// Image preview
	const [openImagePreviewDialog, setOpenImagePreviewDialog] = useState(false)
	const [messageImageUrl, setMessageImageUrl] = useState('')


	// Chat message handler
	const chatMessages = groupChatMessages(useSelector(selectChatMessages))
	const chatMessageRef = useRef<null | HTMLDivElement>(null)

	// Upload file handler
	const [openNotAllowFileMine, setOpenNotAllowFileMine] = useState(false)
	const onDrop = useCallback((acceptedFiles: any) => {
		const file: File = acceptedFiles[0]
		if (!ALLOW_IMAGE_EXTENSIONS.includes(file.type)) {
			setOpenNotAllowFileMine(true)
			return
		}
	}, [])
	const {open: openDropzone, getRootProps, getInputProps, isDragActive} = useDropzone({
		onDrop,
		noClick: true,
		multiple: false,
	})

	if (!currentAffiliate) return <></>
	if (loading) return <ConversationLoading/>

	return (
		<div className={[styles.chatConversation, styles[deviceMode]].join(' ')}>
			<div className={styles.container}  {...getRootProps()}>
				<input {...getInputProps()} />
				<DropzoneOverlay open={isDragActive}/>
				<div className={styles.conversation} ref={chatMessageRef}>
					{
						chatMessages.map((chatList, index) => (
							<ChatMessage key={index}
								affiliateName={currentAffiliate.name}
								avatar={currentAffiliate.avatar}
								messages={chatList}
								side={chatList?.[0].sender === Sender.MERCHANT ? 'right' : 'left'}
								setOpenImagePreviewDialog={setOpenImagePreviewDialog}
								setMessageImageUrl={setMessageImageUrl}
							/>
						))
					}
				</div>
				<ChatPanel openDropzone={openDropzone}/>
			</div>
			<ImagePreviewDialog
				open={openImagePreviewDialog}
				imageUrl={messageImageUrl}
				setOpen={setOpenImagePreviewDialog}
			/>
			<NotAllowFileTypeDialog open={openNotAllowFileMine} setOpen={setOpenNotAllowFileMine}/>
		</div>
	)
}

export default ChatConversation
