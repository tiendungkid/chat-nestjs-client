import {getAxiosInstance} from 'utils/axios'
import {GetConversationsQuery} from './interface'
import { ChatMessage } from 'types/conversation/chat-message';

export const getConversations = async (queries: GetConversationsQuery): Promise<ChatMessage[]> => {
	const response = await (await getAxiosInstance()).get(
		`chat/messages/${queries.affiliateId}`,
		{
			params: {
				lastMessageId: queries.lastMessageId
			}
		}
	)
	return await response.data;
}

export const markAsAllRead = async (affiliateId: number): Promise<void> => {
	await (await getAxiosInstance()).put(
		`chat/mark-as-all-read/${affiliateId}`,
	)
}
