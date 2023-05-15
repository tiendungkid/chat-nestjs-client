import {GetConversationsQuery} from './interface'
import {useQuery} from 'react-query'
import {getConversations} from './services'

export const useGetConversation = (queries: GetConversationsQuery) => {
	return useQuery(['getConversations'], () => getConversations(queries), {
		staleTime: 5 * 1000 * 60,   
	})
}
