import React from 'react'
import ReactDOM from 'react-dom/client'
import './scss/base.scss'
import Chat from './pages/chat'
import {Provider} from 'react-redux'
import {store} from './store'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Chat/>
		</Provider>
	</React.StrictMode>
)
