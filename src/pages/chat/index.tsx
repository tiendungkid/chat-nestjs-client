import React, { useEffect } from 'react';
import ChatLayout from 'layouts/chat-layout';

function Chat() {
	console.log('Chat page rendered');

	const handleClick = () => {
		window.parent.postMessage('def', '*');
	};

	useEffect(() => {
		const handle = (event: any) => {
			// …
			console.log(event.data);
		};

		window.addEventListener('message', handle);
	}, []);

	return (
		<>
			<button onClick={() => handleClick()}>def</button> <ChatLayout />
		</>
	);
}

export default Chat;
