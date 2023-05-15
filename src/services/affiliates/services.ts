import {getAxiosInstance} from 'utils/axios'
import {AffiliatesResponse} from 'types/response-instances/affiliates-response'

const searchAffiliate = async (queries: { query: string, page: number }): Promise<AffiliatesResponse> => {
	const response = await (await getAxiosInstance())
		.get('/api/v1/affiliates', {
			params: queries,			
		})
	return await response.data;
}

export {searchAffiliate}
