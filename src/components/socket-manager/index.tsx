import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from 'utils/socket.io';
import { RootState } from 'store';
import { updateCredentials } from 'store/reducers/credentialSlice';
import { queryClient } from 'services';
import { chunk, flatten, last } from 'lodash';
import { useGetAccessToken } from 'services/merchant/mutation';
import { CircularProgress } from '@mui/material';
import {
	setAffIdParam,
	setAffOpenChat,
	setChatSetting,
} from 'store/reducers/conversationSlice';

interface Props {
	children: React.ReactNode;
	isAff?: boolean;
}

export default function SocketManager(props: Props) {
	const dispatch = useDispatch();
	const accessToken = useSelector(
		(state: RootState) => state.credential.access_token,
	);

	const chatSetting = useSelector(
		(state: RootState) => state.conversation.chatSetting,
	);

	const getAccessToken = useGetAccessToken();

	useEffect(() => {
		const handle = (event: any) => {
			if (event.data.access_token) {
				if (event.data.merchant) {
					getAccessToken.mutate(event.data.access_token);
				} else {
					dispatch(updateCredentials(event.data.access_token));
				}

				window.parent.postMessage('access_token', '*');
			}

			if (event.data.affiliateId !== undefined) {
				dispatch(setAffIdParam(event.data.affiliateId));
				window.parent.postMessage('done_affiliate_param', '*');
			}

			if (event.data.chatSetting !== undefined) {
				dispatch(setChatSetting(event.data.chatSetting));
				window.parent.postMessage('done_chat_setting', '*');
			}

			if (event.data.type === 'affOpenChat') {
				dispatch(setAffOpenChat(event.data.openChat));
			}
		};

		window.addEventListener('message', handle);
		return () => {
			window.removeEventListener('message', handle);
			dispatch(setAffIdParam(-1));
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
						const size = oldData.pages?.[0]?.length || 20;
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
					const affFlat = flatten([...oldData.pages]);
					let affUpdate = [];
					const lastPage: any = last(oldData.pages);

					if (
						!affFlat.find((v) => v.id === affiliate_id) &&
						data.message.id !== 'typing' &&
						data.message.id !== 'un-typing'
					) {
						affUpdate = [
							{ ...data.affiliate, latestMessage: data.message },
							...affFlat,
						];
					} else {
						affUpdate = affFlat.map((v: any) => {
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
					}

					let sortData = [];

					if (data.message.id === 'typing') {
						sortData = [...affUpdate];
					} else {
						sortData = [
							...affUpdate.sort((a: any, b: any) => {
								if (a.latestMessage === null) {
									return 1;
								}

								if (b.latestMessage === null) {
									return -1;
								}

								return a.latestMessage.id < b.latestMessage.id ? 1 : -1;
							}),
						];
					}

					return {
						...oldData,
						pages:
							!lastPage || lastPage.length === 0
								? [...chunk(sortData, 20), []]
								: chunk(sortData, 20),
					};
				});
			}
		});

		socket.on('exception', function (data) {});

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
			socket.off('receive_message');
			socket.disconnect();
		};
	}, [accessToken]);

	if (!accessToken)
		return (
			<div style={{ textAlign: 'center', marginTop: '10px' }}>
				<CircularProgress style={{ color: '#1D85E8' }} size={24} />
			</div>
		);

	return <>{props.children}</>;
}
