import React, {lazy, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import './scss/base.scss'
import Loading from "./components/loading";

const App = lazy(() => import('./app'))

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <React.StrictMode>
        <Suspense fallback={<Loading pageName={'App'}/>}>
            <App/>
        </Suspense>
    </React.StrictMode>
)
