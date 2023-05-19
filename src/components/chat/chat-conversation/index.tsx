import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import {
	DropzoneOverlay,
	ImagePreviewDialog,
	ChatMessage,
	NotAllowFileTypeDialog,
} from '..';
import styles from './styles.module.scss';
import { Sender } from 'types/conversation/sender';
import {
	groupChatMessages,
	stringAvatar,
} from 'utils/affiliate-chat-utils/helpers';
import { ALLOW_IMAGE_EXTENSIONS } from 'utils/constants/files';
import {
	selectChatMessages,
	// selectCurrentAffiliate,
	selectLoadingConversation,
} from 'store/reducers/conversationSlice';
import ConversationLoading from '../conversation-loading';
import ChatPanel from './chat-panel';
import { selectDeviceMode } from 'store/reducers/screenSlice';
import { useGetConversation } from 'services/chat/query';
import { AffiliateRowResponse } from 'types/response-instances/affiliates-response';
import { ChatMessage as Message } from 'types/conversation/chat-message';
import { flatten } from 'lodash';
import { Avatar } from '@mui/material';

interface Props {
	selectedAff: AffiliateRowResponse;
}

const ChatConversation = (props: Props) => {
	const deviceMode = useSelector(selectDeviceMode);
	// const currentAffiliate = useSelector(selectCurrentAffiliate);
	const loading = useSelector(selectLoadingConversation);
	const { selectedAff } = props;

	const { data, fetchNextPage, hasNextPage, isLoading } = useGetConversation(
		selectedAff.id,
	);
	const [messages, setMessages] = useState<Message[]>([]);

	// Image preview
	const [openImagePreviewDialog, setOpenImagePreviewDialog] = useState(false);
	const [messageImageUrl, setMessageImageUrl] = useState('');

	// Chat message handler
	const chatMessages = groupChatMessages(messages);

	// Upload file handler
	const [openNotAllowFileMine, setOpenNotAllowFileMine] = useState(false);
	const onDrop = useCallback((acceptedFiles: any) => {
		const file: File = acceptedFiles[0];
		if (!ALLOW_IMAGE_EXTENSIONS.includes(file.type)) {
			setOpenNotAllowFileMine(true);
			return;
		}
	}, []);

	const observer = useRef<IntersectionObserver | null>(null);

	const loadMore = useCallback(
		(node: HTMLDivElement) => {
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					fetchNextPage();
					observer.current?.unobserve(entries[0].target);
				}
			});
			if (node) observer.current.observe(node);
		},
		[data],
	);

	useEffect(() => {
		if (!data) return;
		const messagePaginate = flatten(data.pages);

		setMessages(messagePaginate);
	}, [data]);

	const {
		open: openDropzone,
		getRootProps,
		getInputProps,
		isDragActive,
	} = useDropzone({
		onDrop,
		noClick: true,
		multiple: false,
	});

	const fullName = selectedAff.first_name + ' ' + selectedAff.last_name;

	// if (!messages.length) return <></>;
	// if (loading) return <ConversationLoading />;

	return (
		<div className={[styles.chatConversation, styles[deviceMode]].join(' ')}>
			<div className={styles.affInfo}>
				{selectedAff.avatar ? (
					<Avatar src={selectedAff.avatar} className={styles.avatar} />
				) : (
					<Avatar
						{...stringAvatar(fullName)}
						src={selectedAff.avatar}
						className={styles.avatar}
					/>
				)}
				<span className={styles.affName}>{fullName}</span>
			</div>
			<div className={styles.container} {...getRootProps()}>
				<input {...getInputProps()} />
				<DropzoneOverlay open={isDragActive} />
				<div className={styles.conversation}>
					{!!messages.length &&
						chatMessages
							.filter((v) => v.length > 0)
							.map((chatList, index) => {
								return (
									<ChatMessage
										key={index}
										affiliateName={`${selectedAff.first_name} ${selectedAff.last_name}`}
										avatar={selectedAff.avatar}
										messages={chatList}
										side={
											chatList?.[0].acc_send === Sender.MERCHANT
												? 'right'
												: 'left'
										}
										setOpenImagePreviewDialog={setOpenImagePreviewDialog}
										setMessageImageUrl={setMessageImageUrl}
									/>
								);
							})}
					<div
						className={styles.loadMore}
						ref={hasNextPage && messages.length > 0 ? loadMore : undefined}
					/>
				</div>
				<ChatPanel openDropzone={openDropzone} selectedAff={selectedAff} />
			</div>
			<ImagePreviewDialog
				open={openImagePreviewDialog}
				imageUrl={messageImageUrl}
				setOpen={setOpenImagePreviewDialog}
			/>
			<NotAllowFileTypeDialog
				open={openNotAllowFileMine}
				setOpen={setOpenNotAllowFileMine}
			/>
		</div>
	);
};

export default ChatConversation;
