import axios from 'axios'
import { store } from 'store'

export const getAxiosInstance = async () => {	
	return axios.create({
		baseURL: '/',
		headers: {
			Authorization: 'Bearer ' + store.getState().credential.access_token,
		},
	})
}
