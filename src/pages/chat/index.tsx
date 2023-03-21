import React, {useState} from 'react'
import ChatLayout from '../../layouts/chat/chat-layout'
import Affiliate from '../../types/affiliate-chat'

function Chat() {
	const [currentConversation, setCurrentConversation] = useState<Affiliate | null>(null)
	const affiliates: Affiliate[] = [
		{
			id: 1,
			name: 'Tien Dung',
			avatar: 'https://i.pinimg.com/736x/df/21/2b/df212bdfb0486f82fe665ec6efae1c0f.jpg',
			latestChat: 'May co tra bo may tien khong thi bao, thang cho nay'
		},
		{
			id: 2,
			name: 'Anthony Phan',
			latestChat: 'Doan xem'
		},
		{
			id: 3,
			name: 'Kratos',
			avatar: 'https://i.pinimg.com/736x/64/5d/7d/645d7d86538e93ebd48187f70c811966.jpg',
			latestChat: 'Tao ko tra tien dau'
		},
		{
			id: 4,
			name: 'Game Over',
			avatar: 'https://i.pinimg.com/736x/42/e4/a7/42e4a71a578af89403778267e7afa9b4.jpg',
			latestChat: 'Mua tau cai banh my nhe'
		},
		{
			id: 5,
			name: 'Affiliate 5',
			avatar: 'https://i.pinimg.com/564x/c1/0b/52/c10b5206d1b8fe74fc28dfbeee271aa2.jpg',
			latestChat: 'Xin chao, nhan tin voi tao'
		},
		{
			id: 6,
			name: 'Affiliate 6',
			avatar: 'https://i.pinimg.com/originals/c3/70/d8/c370d84b40c8a5eef57862db9d6580a4.gif',
		},
		{
			id: 7,
			name: 'Affiliate 7',
			avatar: 'https://i.pinimg.com/564x/e7/3a/cc/e73acce9ea39da3b9228e27556bbddaa.jpg',
		},
		{
			id: 8,
			name: 'Affiliate 8',
			avatar: 'https://i.pinimg.com/564x/f4/b7/38/f4b7384e85a067eea9a1b37aeafbc12f.jpg'
		},
		{
			id: 9,
			name: 'Affiliate 9',
			avatar: 'https://i.pinimg.com/originals/f0/e0/58/f0e058827a6e830a17f6ef7c0dc405ac.gif',
		},
		{
			id: 10,
			name: 'Affiliate 10',
			avatar: 'https://i.pinimg.com/564x/dd/95/c0/dd95c01c98ac45aa296dad4822ec3a43.jpg',
		},
		{
			id: 11,
			name: 'Affiliate 11',
			avatar: 'https://i.pinimg.com/564x/cd/ca/48/cdca48474a0ac60fe479088767d8bf1a.jpg'
		},
		{
			id: 12,
			name: 'Affiliate 12',
			avatar: 'https://i.pinimg.com/564x/a4/63/96/a4639678dbb43dee3b50c70ec21e9c64.jpg'
		},
		{
			id: 13,
			name: 'Affiliate 13',
			avatar: 'https://i.pinimg.com/736x/d2/9c/4d/d29c4db51bfa64f02322207f17b74cba.jpg'
		}
	]
	const onAffiliateClicked = (id: number) => {
		setCurrentConversation(
			affiliates.find(aff => aff.id === id) || null
		)
		console.log(affiliates.find(aff => aff.id === id) || null)
	}
	return (
		<ChatLayout
			affiliates={affiliates}
			loadingAffiliate={false}
			loadingConversation={true}
			activeConversation={currentConversation}
			onAffiliateClicked={onAffiliateClicked}
			onSearchChange={(e) => {
				console.log(e)
			}}
		/>
	)
}

export default Chat
