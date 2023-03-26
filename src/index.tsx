import React, {lazy, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import './scss/base.scss'
import Loading from './components/loading'
import {store} from './store'
import {Provider} from 'react-redux'

const App = lazy(() => import('./app'))

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
	<Provider store={store}>
		<Suspense fallback={<Loading pageName={'App'}/>}>
			<App/>
		</Suspense>
	</Provider>
)
