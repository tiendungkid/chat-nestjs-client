import React, {useEffect, useState} from 'react'
import {Provider} from "react-redux";
import {store} from "./store";
import Chat from "./pages/chat";
import {socket} from "./utils/socket.io";

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
            <Chat/>
        </Provider>
    )
}
