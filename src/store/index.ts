import {configureStore} from '@reduxjs/toolkit'
import ConversationSlice from './reducers/conversationSlice'

export const store = configureStore({
	reducer: {
		conversation: ConversationSlice
	}
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
