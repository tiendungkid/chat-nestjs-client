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
		const handle = (event: any) => {
			dispatch(updateCredentials(event.data));
		};

		window.addEventListener('message', handle);

		return () => {
			window.removeEventListener('message', handle);
		};
	}, []);

	if (!accessToken) return <></>;

	return (
		<>
			<ChatLayout />
		</>
	);
};

export default Chat;
