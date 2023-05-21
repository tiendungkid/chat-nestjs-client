import React from 'react';
import { Typography } from '@mui/material';
import { ChatMessage } from 'types/conversation/chat-message';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import styles from './styles.module.scss';

interface Props {
	message: ChatMessage;
	style?: React.CSSProperties;
}

export default function FileMessage(props: Props) {
	const { message, style = {} } = props;
	const redirectFile = (url: string) => window.open(url);
	return (
		<div
			style={style}
			className={styles.fileContainer}
			onClick={() => redirectFile(message.msg)}
		>
			<CloudDownloadIcon fontSize={'medium'} className={styles.downLoadIcon} />
			<Typography className={styles.fileName}>
				{message.msg.replace(/^.*[\\/]/, '').toString()}
			</Typography>
		</div>
	);
}
