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
import {
	ALLOW_FILE_EXTENSIONS,
	ALLOW_IMAGE_EXTENSIONS,
} from 'utils/constants/files';
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
import { chunk, first, flatten } from 'lodash';
import { Avatar } from '@mui/material';
import { Merchant } from 'types/merchant';
import Affiliate from 'types/affiliate-chat';
import {
	useMarkAsAllReadMutation,
	useUploadFile,
} from 'services/chat/mutation';
import { socket } from 'utils/socket.io';
import { MessageType } from 'types/conversation/message-type';
import { queryClient } from 'services';

interface Props {
	receiver: AffiliateRowResponse | Merchant;
	affiliate?: Affiliate;
}

const ChatConversation = (props: Props) => {
	const deviceMode = useSelector(selectDeviceMode);
	// const currentAffiliate = useSelector(selectCurrentAffiliate);
	const loading = useSelector(selectLoadingConversation);
	const { receiver, affiliate } = props;
	const toId = affiliate ? affiliate.shop_id : receiver.id;
	const { data, fetchNextPage, hasNextPage, isLoading } = useGetConversation(
		toId, // shop_id or affiliate_id
		receiver.shop_id, // shop_id
		affiliate ? affiliate.id : receiver.id, // affiliate_id
	);
	const markAsAllReadMutation = useMarkAsAllReadMutation();
	const [messages, setMessages] = useState<Message[]>([]);
	const uploadFile = useUploadFile();

	// Image preview
	const [openImagePreviewDialog, setOpenImagePreviewDialog] = useState(false);
	const [messageImageUrl, setMessageImageUrl] = useState('');

	// Chat message handler
	const chatMessages = groupChatMessages(messages);

	// Upload file handler
	const [openNotAllowFileMine, setOpenNotAllowFileMine] = useState(false);
	const onDrop = useCallback((acceptedFiles: any) => {
		const file: File = acceptedFiles[0];

		if (
			!ALLOW_IMAGE_EXTENSIONS.includes(file.type) &&
			!ALLOW_FILE_EXTENSIONS.includes(file.type)
		) {
			setOpenNotAllowFileMine(true);
			return;
		}

		uploadFile.mutate(file, {
			onSuccess: (data) => {
				socket.emit('send_message', {
					to_id: toId,
					msg: data,
					msg_type: ALLOW_IMAGE_EXTENSIONS.includes(file.type)
						? MessageType.IMAGE
						: MessageType.FILE,
				});
			},
		});
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
		if (
			(first(messagePaginate)?.id ?? 0) > (first(messages)?.id ?? 0) &&
			((first(messagePaginate)?.acc_send === 'affiliate' && !affiliate) ||
				(first(messagePaginate)?.acc_send === 'merchant' && affiliate))
		) {
			markAsAllReadMutation.mutate(toId);
		}
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

	const fullName = receiver.first_name + ' ' + receiver.last_name;

	// if (receiver) return <></>;
	// if (loading) return <ConversationLoading />;

	return (
		<div className={[styles.chatConversation, styles[deviceMode]].join(' ')}>
			<div className={styles.affInfo}>
				{(receiver as AffiliateRowResponse).avatar ? (
					<Avatar
						src={(receiver as AffiliateRowResponse).avatar}
						className={styles.avatar}
					/>
				) : (
					<Avatar
						{...stringAvatar(fullName)}
						src={(receiver as AffiliateRowResponse).avatar}
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
										affiliateName={`${receiver.first_name} ${receiver.last_name}`}
										avatar={(receiver as AffiliateRowResponse).avatar}
										messages={chatList}
										side={
											(chatList?.[0].acc_send === Sender.MERCHANT &&
												!affiliate) ||
											(chatList?.[0].acc_send !== Sender.MERCHANT && affiliate)
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
				<ChatPanel openDropzone={openDropzone} toId={toId} />
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
