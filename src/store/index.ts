import {configureStore} from '@reduxjs/toolkit'
import ConversationSlice from './reducers/conversationSlice'
import SocketSlice from "./reducers/socketSlice";

export const store = configureStore({
	reducer: {
		conversation: ConversationSlice,
		socket: SocketSlice
	}
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
