import React, {useEffect} from 'react'
import Index from 'layouts/chat-layout'
import {setAffiliates, setLoadingAffiliateList} from 'store/reducers/conversationSlice'
import {useDispatch} from 'react-redux'
import {affiliates} from 'components/chat/test'

function Chat() {
	const dispatch = useDispatch()
	console.log('Chat page rendered')
	useEffect(() => {
		const timeout = setTimeout(() => {
			dispatch(setLoadingAffiliateList(false))
			dispatch(setAffiliates(affiliates))
		}, 2000)
		return () => {
			clearTimeout(timeout)
		}
	}, [])
	return <Index/>
}

export default Chat
