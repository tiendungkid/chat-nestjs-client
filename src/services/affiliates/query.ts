import {useInfiniteQuery, useQuery} from 'react-query'
import {getAffiliate, searchAffiliate} from './services'

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

export const useGetAffiliate = (enabled: boolean) => {
	return useQuery(
    ['affiliate'], 
    () => getAffiliate(), 
    {
      refetchOnWindowFocus: false,    
      keepPreviousData: true,
      enabled
    }
  )
}
