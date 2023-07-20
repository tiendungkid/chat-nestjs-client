import React from 'react';
import ChatLayout from 'layouts/chat-layout';
import SocketManager from 'components/socket-manager';

interface Props {
	isAff?: boolean;
}

const Chat = (props: Props) => {
	const { isAff = false } = props;

	return (
		<SocketManager isAff={isAff}>
			<ChatLayout isAff={isAff} />
		</SocketManager>
	);
};

export default Chat;
