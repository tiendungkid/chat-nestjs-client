import {configureStore} from '@reduxjs/toolkit'
import ConversationSlice from './reducers/conversationSlice'
import SocketSlice from './reducers/socketSlice'
import ScreenSlice from './reducers/screenSlice'

export const store = configureStore({
	reducer: {
		conversation: ConversationSlice,
		socket: SocketSlice,
		screen: ScreenSlice
	}
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
