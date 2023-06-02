import {getAxiosInstance} from 'utils/axios'
import {AffiliateRowResponse} from 'types/response-instances/affiliates-response'
import Affiliate from 'types/affiliate-chat';

const searchAffiliate = async (p: { query: string, last_message_id: number, aff_has_message: number[] }): Promise<AffiliateRowResponse[]> => {
	const response = await (await getAxiosInstance())
		.get('/api/v1/affiliates/list/chat', {
			params: {
				query: p.query, 
				last_message_id: p.last_message_id ?? 0,
				aff_has_message: p.aff_has_message ?? []
			},			
		})
	
	return await response.data;
}

export const getAffiliate = async (): Promise<Affiliate> => {
	const response = await (await getAxiosInstance())
		.get('/api/v1/auth/get-affiliate')
	return await response.data;
}


export {searchAffiliate}
