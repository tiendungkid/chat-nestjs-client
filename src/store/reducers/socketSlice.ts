import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '..'
import ConversationSocket from 'utils/constants/socket';

const initialState: ConversationSocket = {
	isConnected: false
}

const socketSlice = createSlice({
	name: 'socket',
	initialState,
	reducers: {
		setConnected: (state, action: PayloadAction<boolean>) => {
			state.isConnected = action.payload;
      
			return state
		}
	},
})

export const { setConnected } = socketSlice.actions
export const selectConnected = (state: RootState) => state.socket.isConnected

export default socketSlice.reducer

