import React, {useState} from 'react'
import ChatLayout from 'layouts/chat-layout/chat-layout'
import {affiliates} from 'components/chat/test'

function Chat() {
	const [chatValue, setChatValue] = useState('')
	console.log('Chat page rendered')
	return (
		<ChatLayout
			affiliates={affiliates}
			loadingAffiliate={false}
			onSearchChange={(e) => {
				console.log(e)
			}}
			chatValue={chatValue}
			setChatValue={setChatValue}
		/>
	)
}

export default Chat
