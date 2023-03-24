import React, {useState} from 'react'
import ChatLayout from 'layouts/chat-layout/chat-layout'
import Affiliate from 'types/affiliate-chat'
import {groupChatMessages} from 'utils/affiliate-chat-utils/helpers'
import {affiliates, chatMessages} from 'components/chat/test'

function Chat() {

	const [currentConversation, setCurrentConversation] = useState<Affiliate | null>(null)
	const [chatValue, setChatValue] = useState('')
	const [loadingConversation, setLoadingConversation] = useState(false)
	const onAffiliateClicked = (id: number) => {
		setCurrentConversation(
			affiliates.find(aff => aff.id === id) || null
		)
		setLoadingConversation(true)
		setTimeout(() => {
			setLoadingConversation(false)
		}, 500)
	}
	return (
		<ChatLayout
			affiliates={affiliates}
			loadingAffiliate={false}
			loadingConversation={loadingConversation}
			activeConversation={currentConversation}
			onAffiliateClicked={onAffiliateClicked}
			onSearchChange={(e) => {
				console.log(e)
			}}
			chatValue={chatValue}
			setChatValue={setChatValue}
			messages={groupChatMessages(chatMessages)}
		/>
	)
}

export default Chat
