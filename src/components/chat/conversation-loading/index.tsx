import React from 'react'
import {Box, CircularProgress} from '@mui/material'
import styles from './styles.module.scss'

export default function ConversationLoading() {
	return <Box className={styles.loadingContainer} sx={{ display: 'flex' }}><CircularProgress /></Box>
}
