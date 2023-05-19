import {useInfiniteQuery} from 'react-query'
import {searchAffiliate} from './services'

export const useSearchAffiliate = (queries: { query: string }) => {
	return useInfiniteQuery(
    ['affiliates', {...queries}], 
    ({pageParam = 1}) => searchAffiliate({query: queries.query, page: pageParam}), 
    {
      refetchOnWindowFocus: false,
      retry: 5,
      keepPreviousData: true,
      getNextPageParam: (lastItem, allPages) => {
        if (lastItem.length === 0) return undefined;

        return allPages.length + 1;
      }
    }
  )
}
