import {useInfiniteQuery, useQuery} from 'react-query'
import {getAffiliate, searchAffiliate} from './services'

export const useSearchAffiliate = (queries: { query: string }) => {
	return useInfiniteQuery(
    ['affiliates', {...queries}], 
    ({pageParam = {}}) => searchAffiliate({query: queries.query, ...pageParam}), 
    {
      refetchOnWindowFocus: false,
      retry: 5,
      keepPreviousData: true,
      staleTime: Infinity,
      cacheTime: Infinity,
      getNextPageParam: (lastItem) => {
        if (!lastItem || lastItem.length === 0) return undefined;

				return true;
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
      enabled,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  )
}
