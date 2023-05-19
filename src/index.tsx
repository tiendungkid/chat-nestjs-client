import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './scss/base.scss';
import Loading from './components/loading';
import { store } from './store';
import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './services';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = lazy(() => import('./app'));

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<Provider store={store}>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter
				basename="/"
				getUserConfirmation={() => {
					/* Empty callback to block the default browser prompt */
				}}
			>
				<Suspense fallback={<Loading pageName={'App'} />}>
					<Switch>
						<Route path="/" component={App} exact={true} />
						<Route
							path="affiliate"
							render={() => {
								return <>123</>;
							}}
							exact={true}
						/>
					</Switch>
				</Suspense>
			</BrowserRouter>
		</QueryClientProvider>
	</Provider>,
);
