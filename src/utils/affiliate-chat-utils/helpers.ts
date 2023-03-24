import {Collection} from 'collect.js'
import {Sender} from 'types/conversation/sender'
import {ChatMessage} from 'types/conversation/chat-message'

export const MAX_PREVIEW_LATEST_CHAT = 35

const splitLatestChat = (affiliateName: string, latestChat?: string | null) => {
	if (!latestChat) return `Say hi with ${affiliateName}`
	if (latestChat.length > MAX_PREVIEW_LATEST_CHAT) {
		return latestChat.slice(0, MAX_PREVIEW_LATEST_CHAT) + '...'
	}
	return latestChat
}


const stringAvatar = (name: string) => {
	if (!name.includes(' ')) {
		return {
			children: name.slice(0, 1)
		}
	}
	return {
		children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
	}
}

const groupChatMessages = (chatMessages: ChatMessage[]) => {
	let currentSender: Sender = Sender.MERCHANT
	const grouped = []
	let chats = new Collection(chatMessages)

	const filterSender = (message: ChatMessage) => {
		if (message.sender !== currentSender) {
			currentSender = message.sender
			return true
		}
		return false
	}
	let subset: Collection<ChatMessage> = chats.takeUntil(filterSender)

	do {
		grouped.push(subset.all())
		chats = chats.slice(subset.count())
		subset = chats.takeUntil(filterSender)
	} while (subset.count())


	return grouped
}

const getTextOfChatMessages = (chatMessages: ChatMessage[]): unknown[] => {
	const collection = new Collection(chatMessages)
	const messages = collection.pluck('message')
	return messages.all()
}

export {splitLatestChat, stringAvatar, groupChatMessages, getTextOfChatMessages}