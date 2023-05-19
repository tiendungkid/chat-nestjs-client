import React, { lazy, Suspense } from 'react';
import Loading from './components/loading';
import SocketManager from './components/socket-manager';

const Chat = lazy(() => import(/* webpackChunkName: "chat" */ './pages/chat'));

export default function App() {
	return (
		<SocketManager>
			<Chat />
		</SocketManager>
	);
}
