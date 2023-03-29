import { QueryClient } from 'react-query'

const queryClient = new QueryClient()
const retryQuery = 1
const retryDelayQuery = 1000

export { queryClient, retryQuery, retryDelayQuery }
