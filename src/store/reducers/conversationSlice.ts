import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '..'
import {ChatMessage} from 'types/conversation/chat-message'
import Affiliate from 'types/affiliate-chat'

interface ConversationState {
    searchAffiliateQuery: {
        query: string,
        page: number
    },
    currentAffiliate: Affiliate | null,
    loadingConversation: boolean,
    chatMessages: ChatMessage[],
}

const initialState: ConversationState = {
	searchAffiliateQuery: {
		query: '',
		page: 1
	},
	currentAffiliate: null,
	loadingConversation: false,
	chatMessages: [],
}

const conversationSlice = createSlice({
	name: 'conversation',
	initialState,
	reducers: {
		setSearchAffiliateQuery(state, action: PayloadAction<{ query: string, page: number }>) {
			state.searchAffiliateQuery = action.payload
			return state
		},

		setCurrentAffiliate: (state, action: PayloadAction<Affiliate | null>) => {
			state.currentAffiliate = action.payload
			return state
		},

		setLoadingConversation(state, action: PayloadAction<boolean>) {
			state.loadingConversation = action.payload
			return state
		},

		setChatMessages(state, action: PayloadAction<ChatMessage[]>) {
			state.chatMessages = action.payload
			return state
		}
	},
})

export const {
	setSearchAffiliateQuery,
	setCurrentAffiliate,
	setLoadingConversation,
	setChatMessages,
} = conversationSlice.actions
export const selectSearchAffiliateQuery = (state: RootState) => state.conversation.searchAffiliateQuery
export const selectCurrentAffiliate = (state: RootState) => state.conversation.currentAffiliate
export const selectLoadingConversation = (state: RootState) => state.conversation.loadingConversation
export const selectChatMessages = (state: RootState) => state.conversation.chatMessages

export default conversationSlice.reducer

