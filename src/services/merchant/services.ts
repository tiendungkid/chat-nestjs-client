import {getAxiosInstance} from 'utils/axios'
import { Merchant } from 'types/merchant';
import axios from 'axios';

export const getMerchant = async (): Promise<Merchant> => {
	const response = await (await getAxiosInstance())
		.get('/api/v1/auth/get-merchant')
	return await response.data;
}

export const getAccessToken = async (shopifyToken: string): Promise<string> => {
	const response = await axios.create({
		baseURL: '/',
		headers: {
			Authorization: 'Bearer ' + shopifyToken,					
		},
	}).get('/api/v1/auth/get-token')

	return await response.data;
}
