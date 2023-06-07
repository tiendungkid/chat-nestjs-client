import {useInfiniteQuery, useQuery} from 'react-query'
import {affiliateGetUnreadCount, getConversations} from './services'
import { ChatMessage } from 'types/conversation/chat-message'

export const useGetConversation = (receiverId: number, shop_id: number, affiliate_id: number) => {
	return useInfiniteQuery(
		['conversations', {shop_id, affiliate_id}], 
		({pageParam = 0}) => getConversations({receiverId, lastMessageId: pageParam}), 
		{
			staleTime: Infinity,   
			refetchOnWindowFocus: false,			
			keepPreviousData: true,
			getNextPageParam: (lastItem: ChatMessage[]) => {	
				if (!lastItem) return undefined;										
				return lastItem[lastItem.length - 1]?.id;
			},	
		}
	)
}

export const useAffiliateGetUnreadCount = (enabled: boolean) => {
	return useQuery(['conversations', 'affiliate_unread_count'], () => affiliateGetUnreadCount(), {
		staleTime: Infinity,
		refetchOnWindowFocus: false,			
		keepPreviousData: true,
		enabled
	})
}
