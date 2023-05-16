import {useInfiniteQuery} from 'react-query'
import {getConversations} from './services'

export const useGetConversation = (affiliateId: number) => {
	return useInfiniteQuery(
		['getConversations', affiliateId], 
		({pageParam = 1}) => getConversations({affiliateId, page: pageParam}), 
		{
			staleTime: 5 * 1000 * 60,   
			refetchOnWindowFocus: false,
			retry: 5,
			keepPreviousData: true,
      getNextPageParam: lastItem => {
        if (lastItem.lastPage === lastItem.currentPage) return undefined;

        return lastItem.nextPage;
      },      
		}
	)
}
