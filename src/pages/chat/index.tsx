import React, { useEffect } from 'react';
import ChatLayout from 'layouts/chat-layout';
import { useDispatch, useSelector } from 'react-redux';
import { updateCredentials } from 'store/reducers/credentialSlice';
import { RootState } from 'store';

const Chat = () => {
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

	if (!accessToken) return <></>;

	return <ChatLayout />;
};

export default Chat;
