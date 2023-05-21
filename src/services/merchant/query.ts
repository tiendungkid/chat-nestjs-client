import { useQuery} from 'react-query'
import { getMerchant } from './services';

export const useGetMerchant = () => {
	return useQuery(
    ['merchant'], 
    () => getMerchant(), 
    {
      refetchOnWindowFocus: false,    
      keepPreviousData: true,     
    }
  )
}
