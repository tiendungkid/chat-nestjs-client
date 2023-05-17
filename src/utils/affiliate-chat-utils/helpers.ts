import {Collection} from 'collect.js'
import {Sender} from 'types/conversation/sender'
import {ChatMessage} from 'types/conversation/chat-message'
import {AffiliatesResponse} from 'types/response-instances/affiliates-response'
import Affiliate from 'types/affiliate-chat'
import moment from 'moment'

export const MAX_PREVIEW_LATEST_CHAT = 35

const splitLatestChat = (affiliateName: string, latestChat?: string | null) => {
	if (!latestChat) return 'Click to start conversation'
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
		if (message.acc_send !== currentSender) {
			currentSender = message.acc_send
			return true
		}
		return false
	}
	let subset: Collection<ChatMessage> = chats.takeUntil(filterSender)

	do {
		grouped.push(subset.all().reverse())
		chats = chats.slice(subset.count())
		subset = chats.takeUntil(filterSender)
	} while (subset.count())

	return grouped
}

const convertAffiliateFromResponse = (affiliateResponse: AffiliatesResponse): Affiliate[] => {
	const affiliates = affiliateResponse.rows
	if (!affiliates.length) return []
	return affiliates.map((affiliate) => {
		return {
			id: affiliate.id,
			name: `${affiliate.first_name} ${affiliate.last_name}`,
			avatar: affiliate.avatar,
			latestMessage: affiliate.latestMessage
		}
	})
}

const convertTimeSend = (timestamp: number) => {
	return moment(timestamp * 1000).format('hh:mm:ss YYYY-MM-DD');
}

export {splitLatestChat, stringAvatar, groupChatMessages, convertAffiliateFromResponse, convertTimeSend}
