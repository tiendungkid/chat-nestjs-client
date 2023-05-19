import {useInfiniteQuery} from 'react-query'
import {getConversations} from './services'
import { ChatMessage } from 'types/conversation/chat-message'

export const useGetConversation = (affiliateId: number) => {
	return useInfiniteQuery(
		['conversations', affiliateId], 
		({pageParam = 0}) => getConversations({affiliateId, lastMessageId: pageParam}), 
		{
			staleTime: Infinity,   
			refetchOnWindowFocus: false,			
			keepPreviousData: true,
			getNextPageParam: (lastItem: ChatMessage[]) => {											
				return lastItem[lastItem.length - 1]?.id;
			},
		}
	)
}
