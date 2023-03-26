import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '..'
import {ChatMessage} from 'types/conversation/chat-message'
import {MessageType} from 'types/conversation/message-type'

const initialState: {
    chatMessages: ChatMessage[],
} = {
	chatMessages: [],
}

const conversationSlice = createSlice({
	name: 'conversation',
	initialState,
	reducers: {
		setChatMessages: (state, action: PayloadAction<ChatMessage[]>) => {
			state.chatMessages = action.payload
			return state
		},
		pushTyping: (state, action) => {
			state.chatMessages = [
				...state.chatMessages,
				{
					id: new Date().getTime(),
					sender: action.payload.sender,
					message: '',
					message_type: MessageType.TYPING,
					read: false,
					sent_at: 'Today'
				}
			]
			return state
		},
		pushNewMessage: (state, action: PayloadAction<ChatMessage>) => {
			const newMessage = action.payload
			state.chatMessages = [
				...state.chatMessages,
				{
					id: new Date().getTime(),
					sender: newMessage.sender,
					message: newMessage.message,
					message_type: newMessage.message_type,
					read: false,
					sent_at: 'Today'
				}
			]
			return state
		}
	},
})

export const {
	setChatMessages,
	pushNewMessage,
} = conversationSlice.actions
export const selectChatMessages = (state: RootState) => state.conversation.chatMessages

export default conversationSlice.reducer

