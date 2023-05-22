import {io} from 'socket.io-client';

const URL = process.env.SOCKET_URL || 'http://localhost:3006';

export const socket = io(URL, {
    autoConnect: false,
});
