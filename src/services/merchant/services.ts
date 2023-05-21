import {getAxiosInstance} from 'utils/axios'
import { Merchant } from 'types/merchant';

export const getMerchant = async (): Promise<Merchant> => {
	const response = await (await getAxiosInstance())
		.get('/api/v1/auth/get-merchant')
	return await response.data;
}
