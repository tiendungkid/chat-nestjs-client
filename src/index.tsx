import React from 'react'
import ReactDOM from 'react-dom/client'
import './scss/base.scss'
import Chat from './pages/chat'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fal} from '@fortawesome/pro-light-svg-icons'

library.add(fal)
const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)
root.render(
	<React.StrictMode>
		<Chat/>
	</React.StrictMode>
)
