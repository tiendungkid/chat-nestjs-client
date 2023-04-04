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
