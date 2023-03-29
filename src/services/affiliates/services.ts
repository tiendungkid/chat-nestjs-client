import {getAxiosInstance} from 'utils/axios'

const searchAffiliate = async (queries: { query: string, page: number }) => {
	const response = await (await getAxiosInstance())
		.get('/api/v1/affiliates', {
			params: queries
		})
		.catch(err => err)
	return await response.data
}

export {searchAffiliate}
