import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from 'utils/socket.io';
import { RootState } from 'store';
import { updateCredentials } from 'store/reducers/credentialSlice';
import { queryClient } from 'services';
import { Sender } from 'types/conversation/sender';
import { chunk, flatten, last } from 'lodash';
import { useMarkAsAllReadMutation } from 'services/chat/mutation';

interface Props {
	children: React.ReactNode;
	isAff?: boolean;
}

export default function SocketManager(props: Props) {
	const dispatch = useDispatch();
	const accessToken = useSelector(
		(state: RootState) => state.credential.access_token,
	);

	const markAsAllReadMutation = useMarkAsAllReadMutation();

	useEffect(() => {
		let intervalRefreshToken: any = null;
		const handle = (event: any) => {
			dispatch(updateCredentials(event.data.access_token));
			window.parent.postMessage('access_token', '*');

			// request refresh token
			intervalRefreshToken = setInterval(() => {
				window.parent.postMessage('refresh_token', '*');
			}, 60000 * +event.data.expires || 3);
		};

		window.addEventListener('message', handle);

		return () => {
			window.removeEventListener('message', handle);
			if (intervalRefreshToken) clearInterval(intervalRefreshToken);
		};
	}, []);

	useEffect(() => {
		if (!accessToken) return;
		socket.io.opts.extraHeaders! = { Authorization: `Bearer ${accessToken}` };
		socket.connect();
		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);

		function onConnect() {
			socket.emit('subscribe');
		}

		function onDisconnect() {
			socket.emit('unsubscribe');
		}

		socket.on('receive_message', function (data) {
			const affiliate_id = data.affiliateId;
			const shop_id = data.shopId;
			const cacheConversation = queryClient.getQueryData([
				'conversations',
				{ shop_id, affiliate_id },
			]);

			if (cacheConversation) {
				queryClient.setQueryData(
					['conversations', { shop_id, affiliate_id }],
					(oldData: any) => {
						if (!oldData) return undefined;
						const size = oldData.pages?.[0].length || 0;
						const newDataPages = flatten(oldData.pages).filter(
							(v: any) => v.id !== 'typing',
						);

						if (data.message.id === 'un-typing') {
							return {
								...oldData,
								pages: chunk(newDataPages, size),
							};
						}

						return {
							...oldData,
							pages: chunk([data.message, ...newDataPages], size),
						};
					},
				);
			}

			const queryCache = queryClient.getQueryCache();
			const queryKeys =
				queryCache
					.getAll()
					.map((cache) => cache.queryKey)
					.filter((v: any) => v.find((k: any) => k === 'affiliates')) ?? [];

			for (const queryKey of queryKeys) {
				const cacheAffiliate = queryClient.getQueryData(queryKey);
				if (!cacheAffiliate) continue;

				queryClient.setQueryData(queryKey as any, (oldData: any) => {
					if (!oldData) return;
					const size = oldData.pages?.[0].length || 0;

					const affFlat = flatten([...oldData.pages]);

					const affUpdate = affFlat.map((v: any) => {
						if (v.id === affiliate_id) {
							if (data.message.id === 'typing') {
								queryClient.setQueryData(
									['latestMessage', affiliate_id],
									v.latestMessage,
								);
							} else if (
								data.message.id === 'un-typing' &&
								queryClient.getQueryData(['latestMessage', affiliate_id])
							) {
								return {
									...v,
									latestMessage: queryClient.getQueryData([
										'latestMessage',
										affiliate_id,
									]),
								};
							}

							if (!data.message.msg) return v;

							return { ...v, latestMessage: data.message };
						}

						return v;
					});

					return {
						...oldData,
						pages: chunk(affUpdate, size),
					};
				});
			}
		});

		socket.on('exception', function (data) {
			console.log('event', data);
		});

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
			socket.off('receive_message');
			socket.disconnect();
		};
	}, [accessToken]);

	if (!accessToken) return <></>;

	return <>{props.children}</>;
}
