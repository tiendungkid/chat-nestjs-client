import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {socket} from 'utils/socket.io'
import {setConnected} from 'store/reducers/socketSlice'

interface Props {
    children: React.ReactNode
}

export default function SocketManager(props: Props) {
	const dispatch = useDispatch()

	useEffect(() => {
		// socket.connect()
		socket.on('connect', onConnect)
		socket.on('disconnect', onDisconnect)

		function onConnect() {
			dispatch(setConnected(true))
		}

		function onDisconnect() {
			dispatch(setConnected(false))
		}

		return () => {
			socket.off('connect', onConnect)
			socket.off('disconnect', onDisconnect)
		}
	}, [])

	return <>{props.children}</>
}
