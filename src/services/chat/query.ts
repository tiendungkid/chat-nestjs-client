import {GetConversationsQuery} from './interface'
import {useQuery} from 'react-query'
import {getConversations} from './services'

export const useGetConversation = (queries: GetConversationsQuery) => {
	return useQuery({
		queryKey: ['getConversations'],
		queryFn: () => getConversations(queries),
		refetchOnWindowFocus: false,
	})
}
