import React, { lazy, Suspense } from 'react';
import './scss/base.scss';
import { store } from './store';
import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './services';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
const Chat = lazy(() => import(/* webpackChunkName: "chat" */ './pages/chat'));

export default function App() {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter
					basename="/"
					getUserConfirmation={() => {
						/* Empty callback to block the default browser prompt */
					}}
				>
					<Suspense>
						<Switch>
							<Route
								path="/"
								render={() => {
									return <Chat />;
								}}
								exact={true}
							/>
							<Route
								path="/affiliate"
								render={() => {
									return <Chat isAff />;
								}}
								exact={true}
							/>
						</Switch>
					</Suspense>
				</BrowserRouter>
			</QueryClientProvider>
		</Provider>
	);
}
