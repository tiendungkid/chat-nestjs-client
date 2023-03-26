import {io} from 'socket.io-client'

const URL = 'localhost:3006';

export const socket = io(URL);
