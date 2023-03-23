import React, {useState} from 'react'
import ChatLayout from 'layouts/chat-layout/chat-layout'
import Affiliate from 'types/affiliate-chat'
import {groupChatMessages} from 'utils/affiliate-chat-utils/helpers'
import {MessageType} from 'types/conversation/message-type'
import {Sender} from 'types/conversation/sender'
import {ChatMessage as Messages} from 'types/conversation/chat-message'
import Typing from '../../layouts/chat-layout/components/typing'

function Chat() {

	const [currentConversation, setCurrentConversation] = useState<Affiliate | null>(null)
	const [chatValue, setChatValue] = useState('')
	const [loadingConversation, setLoadingConversation] = useState(false)
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
			latestChat: 'Doan xem hihi'
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
	const chatMessages: Messages[] = [
		{
			id: 1,
			message: 'E thằng kia mày trả tiền cho tau đi',
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.MERCHANT
		},
		{
			id: 2,
			message: 'Tao còn đi mua cơm nữa, đói vk',
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.MERCHANT
		},
		{
			id: 3,
			message: 'Tao xin lỗi tao hết tiền rồi 😀',
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.AFFILIATE
		},
		{
			id: 4,
			message: 'Để sang tháng tao trả nhé, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.AFFILIATE
		},
		{
			id: 5,
			message: 'Đc không ?',
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.AFFILIATE
		},
		{
			id: 6,
			message: 'Nhớ mà trat sớm cho tao đừng để tao nhắc lần nữa',
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.MERCHANT
		},
		{
			id: 7,
			message: 'Oke',
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.AFFILIATE
		},
		{
			id: 8,
			message: 'Tháng sau t trả 1 nửa thôi',
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.AFFILIATE
		},
		{
			id: 9,
			message: 'Dạo này đói kém lắm',
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.AFFILIATE
		},
		{
			id: 10,
			message: 'nhé',
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.AFFILIATE
		},
		{
			id: 11,
			message: 'nhé',
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.AFFILIATE
		},
		{
			id: 12,
			message: 'nhé',
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.AFFILIATE
		},
		{
			id: 13,
			message: 'nhé',
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.AFFILIATE
		},
		{
			id: 14,
			message: 'nhé',
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.AFFILIATE
		},
		{
			id: 15,
			message: 'nhé',
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.AFFILIATE
		},
		{
			id: 16,
			message: 'nhé',
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.AFFILIATE
		},
		{
			id: 17,
			message: 'nhé',
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.AFFILIATE
		},
		{
			id: 18,
			message: 'nhé',
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.AFFILIATE
		},
		{
			id: 19,
			message: 'nhé',
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.AFFILIATE
		},
		{
			id: 20,
			message: 'Ờ đc r, đm nhắn ít thôi',
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.MERCHANT
		},
		{
			id: 21,
			message: 'như thằng điên ý 🤬',
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.MERCHANT
		},
		{
			id: 21,
			message: <Typing/>,
			message_type: MessageType.TEXT,
			read: true,
			sent_at: 'Today',
			sender: Sender.MERCHANT
		}
	]
	const onAffiliateClicked = (id: number) => {
		setCurrentConversation(
			affiliates.find(aff => aff.id === id) || null
		)
		setLoadingConversation(true)
		setTimeout(() => {
			setLoadingConversation(false)
		}, 500)
	}
	return (
		<ChatLayout
			affiliates={affiliates}
			loadingAffiliate={false}
			loadingConversation={loadingConversation}
			activeConversation={currentConversation}
			onAffiliateClicked={onAffiliateClicked}
			onSearchChange={(e) => {
				console.log(e)
			}}
			chatValue={chatValue}
			setChatValue={setChatValue}
			messages={groupChatMessages(chatMessages)}
		/>
	)
}

export default Chat
