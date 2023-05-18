import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from 'utils/socket.io';
import { setConnected } from 'store/reducers/socketSlice';
import { RootState } from 'store';
import { updateCredentials } from 'store/reducers/credentialSlice';

interface Props {
	children: React.ReactNode;
}

export default function SocketManager(props: Props) {
	const dispatch = useDispatch();
	const accessToken = useSelector(
		(state: RootState) => state.credential.access_token,
	);

	useEffect(() => {
		let intervalRefreshToken: any = null;
		const handle = (event: any) => {
			dispatch(updateCredentials(event.data.access_token));
			window.parent.postMessage('access_token', '*');
			// request refresh token
			intervalRefreshToken = setInterval(() => {
				window.parent.postMessage('refresh_token', '*');
			}, 60000 * event.data.expires);
		};

		window.addEventListener('message', handle);

		return () => {
			window.removeEventListener('message', handle);
			if (intervalRefreshToken) clearInterval(intervalRefreshToken);
		};
	}, []);

	useEffect(() => {
		if (!accessToken) return;
		socket.io.opts.extraHeaders! = { Authorization: `Bearer ${accessToken}` };
		socket.connect();
		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);

		function onConnect() {
			dispatch(setConnected(true));
			socket.emit('join_chat');
		}

		function onDisconnect() {
			dispatch(setConnected(false));
		}

		socket.on('receive_message', function (data) {
			console.log('receive_message', data);
		});

		socket.on('exception', function (data) {
			console.log('event', data);
		});

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
			socket.off('receive_message');
			socket.disconnect();
		};
	}, [accessToken]);

	if (!accessToken) return <></>;

	return <>{props.children}</>;
}
