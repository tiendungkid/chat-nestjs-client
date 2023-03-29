import axios from 'axios'

export const getAxiosInstance = async () => {
	return axios.create({
		baseURL: '/'
	})
}
