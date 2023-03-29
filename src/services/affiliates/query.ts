import {useQuery} from 'react-query'
import {searchAffiliate} from './services'

export const useSearchAffiliate = (queries: { query: string, page: number }) => {
	return useQuery({
		queryKey: ['getAffiliates', {...queries}],
		queryFn: () => searchAffiliate(queries),
		refetchOnWindowFocus: false,
	})
}
