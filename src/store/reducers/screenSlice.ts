import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '..'
import {DeviceMode} from 'types/device-mode'

interface ScreenState {
    deviceMode: DeviceMode
}

const initialState: ScreenState = {
	deviceMode: DeviceMode.DESKTOP
}

const screenSlice = createSlice({
	name: 'device',
	initialState,
	reducers: {
		setDeviceMode: (state, action: PayloadAction<DeviceMode>) => {
			state.deviceMode = action.payload
			return state
		}
	},
})

export const {setDeviceMode} = screenSlice.actions
export const selectDeviceMode = (state: RootState) => state.screen.deviceMode

export default screenSlice.reducer

