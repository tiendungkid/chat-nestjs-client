import {getAxiosInstance} from 'utils/axios'
import {GetConversationsQuery} from './interface'

export const getConversations = async (queries: GetConversationsQuery) => {
	const response = (await getAxiosInstance()).get(
		`chat/${queries.affiliateId}`,
		{
			params: {
				page: queries.page
			}
		}
	)
	return (await response).data
}

export const markAsAllRead = async (affiliateId: number): Promise<void> => {
	await (await getAxiosInstance()).put(
		`chat/mark-as-all-read/${affiliateId}`,
	)
}
