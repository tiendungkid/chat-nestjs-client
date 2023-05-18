import {io} from 'socket.io-client';
import { store } from 'store'

const URL = 'http://localhost:3006';

export const socket = io(URL, {
    autoConnect: false,
    // extraHeaders: {
    //     Authorization: 'Bearer ' + store.getState().credential.access_token,
    // }
});
