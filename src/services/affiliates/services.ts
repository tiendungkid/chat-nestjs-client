import {getAxiosInstance} from 'utils/axios'
import {AffiliateRowResponse} from 'types/response-instances/affiliates-response'
import Affiliate from 'types/affiliate-chat';

const searchAffiliate = async (queries: { query: string, page: number }): Promise<AffiliateRowResponse[]> => {
	const response = await (await getAxiosInstance())
		.get('/api/v1/affiliates', {
			params: queries,			
		})
	return await response.data;
}

export const getAffiliate = async (): Promise<Affiliate> => {
	const response = await (await getAxiosInstance())
		.get('/api/v1/auth/get-affiliate')
	return await response.data;
}


export {searchAffiliate}
