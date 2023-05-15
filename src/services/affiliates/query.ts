import {useInfiniteQuery} from 'react-query'
import {searchAffiliate} from './services'

export const useSearchAffiliate = (queries: { query: string }) => {
	return useInfiniteQuery(
    ['getAffiliates', {...queries}], 
    ({pageParam = 1}) => searchAffiliate({query: queries.query, page: pageParam}), 
    {
      refetchOnWindowFocus: false,
      retry: 5,
      keepPreviousData: true,
      getNextPageParam: lastItem => {
        if (lastItem.lastPage === lastItem.currentPage) return undefined;

        return lastItem.nextPage;
      }
    }
  )
}
