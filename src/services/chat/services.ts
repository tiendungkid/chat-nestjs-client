import {getAxiosInstance} from 'utils/axios'
import {GetConversationsQuery} from './interface'
import { ChatMessage } from 'types/conversation/chat-message';

export const getConversations = async (queries: GetConversationsQuery): Promise<ChatMessage[]> => {
	const response = await (await getAxiosInstance()).get(
		`api/v1/chat/messages/${queries.receiverId}`,
		{
			params: {
				lastMessageId: queries.lastMessageId
			}
		}
	)
	return await response.data;
}

export const markAsAllRead = async (affiliateId: number): Promise<{shop_id: number, affiliate_id: number}> => {
	const response = await (await getAxiosInstance()).put(
		`api/v1/chat/mark-as-all-read/${affiliateId}`,
	)

	return await response.data;
}

export const uploadFile = async (file: File): Promise<string> => {
	const formData = new FormData();
	formData.append('file', file);

	const response = await (
		await getAxiosInstance()
	).post('/api/v1/chat/upload-file', formData, {
		headers: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'Content-Type': 'multipart/form-data',
		},
	});

	return response.data;
}
