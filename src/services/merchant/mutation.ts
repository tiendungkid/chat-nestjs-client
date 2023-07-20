import {useMutation} from 'react-query'
import { getAccessToken } from './services';
import { store } from 'store';
import { updateCredentials } from 'store/reducers/credentialSlice';

export const useGetAccessToken = () => useMutation((shopifyToken: string) => getAccessToken(shopifyToken), {
    onSuccess: (dataToken) => {
        store.dispatch(updateCredentials(dataToken))
    }
})
