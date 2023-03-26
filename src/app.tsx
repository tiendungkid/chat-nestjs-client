import React, {lazy, Suspense, useEffect, useState} from 'react'
import {Provider} from "react-redux"
import {store} from "./store"
import {socket} from "./utils/socket.io"
import Loading from "./components/loading";

const Chat = lazy(() => import(/* webpackChunkName: "chat" */ "./pages/chat"))

export default function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    return (
        <Provider store={store}>
            <Suspense fallback={<Loading pageName={'Chat'}/>}>
                <Chat/>
            </Suspense>
        </Provider>
    )
}
