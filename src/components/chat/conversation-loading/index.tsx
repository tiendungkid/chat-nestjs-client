import React from 'react'
import {Box, CircularProgress} from '@mui/material'
import styles from './styles.module.scss'
import {useSelector} from 'react-redux'
import {selectDeviceMode} from 'store/reducers/screenSlice'

export default function ConversationLoading() {
	const deviceMode = useSelector(selectDeviceMode)
	console.log('render loading conversions')
	return (
		<Box
			className={[styles[deviceMode], styles.loadingContainer].join(' ')}
			sx={{display: 'flex'}}>
			<CircularProgress/>
		</Box>
	)
}
