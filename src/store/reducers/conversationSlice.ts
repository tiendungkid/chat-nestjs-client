import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '..'
import {ChatMessage} from 'types/conversation/chat-message'
import {MessageType} from 'types/conversation/message-type'
import Affiliate from 'types/affiliate-chat'

interface ConversationState {
    searchAffiliateQuery: string,
    affiliates: Affiliate[],
    currentAffiliate: Affiliate | null,
    loadingAffiliateList: boolean,
    loadingConversation: boolean,
    chatMessages: ChatMessage[],
}

const initialState: ConversationState = {
	searchAffiliateQuery: '',
	affiliates: [],
	currentAffiliate: null,
	loadingAffiliateList: true,
	loadingConversation: false,
	chatMessages: [],
}

const conversationSlice = createSlice({
	name: 'conversation',
	initialState,
	reducers: {
		setSearchAffiliateQuery(state, action: PayloadAction<string>) {
			state.searchAffiliateQuery = action.payload
			return state
		},

		setAffiliates(state, action: PayloadAction<Affiliate[]>) {
			state.affiliates = action.payload
			return state
		},

		setCurrentAffiliate: (state, action: PayloadAction<Affiliate | null>) => {
			state.currentAffiliate = action.payload
			return state
		},

		setLoadingAffiliateList(state, action: PayloadAction<boolean>) {
			state.loadingAffiliateList = action.payload
		},

		setLoadingConversation(state, action: PayloadAction<boolean>) {
			state.loadingConversation = action.payload
			return state
		},

		setChatMessages(state, action: PayloadAction<ChatMessage[]>) {
			state.chatMessages = action.payload
			return state
		},

		pushTyping(state, action) {
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

		pushNewMessage(state, action: PayloadAction<ChatMessage>) {
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
	setSearchAffiliateQuery,
	setAffiliates,
	setCurrentAffiliate,
	setLoadingAffiliateList,
	setLoadingConversation,
	setChatMessages,
	pushTyping,
	pushNewMessage
} = conversationSlice.actions
export const selectSearchAffiliateQuery = (state: RootState) => state.conversation.searchAffiliateQuery
export const selectAffiliates = (state: RootState) => state.conversation.affiliates
export const selectCurrentAffiliate = (state: RootState) => state.conversation.currentAffiliate
export const selectLoadingAffiliateList = (state: RootState) => state.conversation.loadingAffiliateList
export const selectLoadingConversation = (state: RootState) => state.conversation.loadingConversation
export const selectChatMessages = (state: RootState) => state.conversation.chatMessages

export default conversationSlice.reducer

