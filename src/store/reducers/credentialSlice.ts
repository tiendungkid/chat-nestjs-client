import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	access_token: '',
}
const credentialSlice = createSlice({
	name: 'credentials',
	initialState,
	reducers: {
		updateCredentials: (state, action) => {
			state.access_token = action.payload;
		},
	}
})

export const {	
	updateCredentials,
} = credentialSlice.actions;

export default credentialSlice.reducer;
