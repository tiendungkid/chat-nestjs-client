import React from 'react';
import { ChatMessage } from 'types/conversation/chat-message';
import styles from './styles.module.scss';
import { Tooltip } from '@mui/material';
import { convertTimeSend } from 'utils/affiliate-chat-utils/helpers';

interface Props {
	message: ChatMessage;
	onImageClick: (message: string) => void;
}

const ImageMessage = (props: Props) => {
	const { message, onImageClick } = props;
	return (
		<div className={styles.imageContainer}>
			<Tooltip
				title={convertTimeSend(message.time_send)}
				placement={'right-start'}
			>
				<img
					src={message.msg}
					alt=""
					onClick={() => onImageClick(message.msg)}
				/>
			</Tooltip>
		</div>
	);
};

export default ImageMessage;
