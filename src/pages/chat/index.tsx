import React, {useState} from 'react'
import ChatLayout from 'layouts/chat-layout/chat-layout'
import Affiliate from 'types/affiliate-chat'
import {affiliates, chatMessages} from 'components/chat/test'
import {useDispatch} from 'react-redux'
import {setChatMessages} from 'store/reducers/conversationSlice'

function Chat() {
	const [currentConversation, setCurrentConversation] = useState<Affiliate | null>(null)
	const [chatValue, setChatValue] = useState('')
	const [loadingConversation, setLoadingConversation] = useState(false)
	const dispatch = useDispatch()

	const onAffiliateClicked = (id: number) => {
		setCurrentConversation(
			affiliates.find(aff => aff.id === id) || null
		)
		setLoadingConversation(true)
		setTimeout(() => {
			setLoadingConversation(false)
			dispatch(setChatMessages(chatMessages))
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
		/>
	)
}

export default Chat
