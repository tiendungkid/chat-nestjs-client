import Affiliate from 'types/affiliate-chat'
import {ChatMessage as Messages} from 'types/conversation/chat-message'
import {MessageType} from 'types/conversation/message-type'
import {Sender} from 'types/conversation/sender'

const affiliates: Affiliate[] = [
	{
		id: 1,
		name: 'Tien Dung',
		avatar: 'https://i.pinimg.com/736x/df/21/2b/df212bdfb0486f82fe665ec6efae1c0f.jpg',
		latestChat: 'May co tra bo may tien khong thi bao, thang cho nay huhu'
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
		name: 'Nguyễn Trà My',
		avatar: 'https://i.pinimg.com/564x/00/4d/f1/004df1cd89b71e93d66856d38eed8e6e.jpg',
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
		id: Math.random(),
		message: 'E thằng kia mày trả tiền cho tau đi',
		message_type: MessageType.TEXT,
		read: true,
		sent_at: 'Today',
		sender: Sender.MERCHANT
	},
	{
		id: Math.random(),
		message: 'Tao còn đi mua cơm nữa, đói vk',
		message_type: MessageType.TEXT,
		read: true,
		sent_at: 'Today',
		sender: Sender.MERCHANT
	},
	{
		id: Math.random(),
		message: 'Tao xin lỗi tao hết tiền rồi 😀',
		message_type: MessageType.TEXT,
		read: true,
		sent_at: 'Today',
		sender: Sender.AFFILIATE
	},
	{
		id: Math.random(),
		message: 'Để sang tháng tao trả nhé, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
		message_type: MessageType.TEXT,
		read: true,
		sent_at: 'Today',
		sender: Sender.AFFILIATE
	},
	{
		id: Math.random(),
		message: 'Đc không ?',
		message_type: MessageType.TEXT,
		read: true,
		sent_at: 'Today',
		sender: Sender.AFFILIATE
	},
	{
		id: Math.random(),
		message: 'Nhớ mà trat sớm cho tao đừng để tao nhắc lần nữa',
		message_type: MessageType.TEXT,
		read: true,
		sent_at: 'Today',
		sender: Sender.MERCHANT
	},
	{
		id: Math.random(),
		message: 'Oke',
		message_type: MessageType.TEXT,
		read: true,
		sent_at: 'Today',
		sender: Sender.AFFILIATE
	},
	{
		id: Math.random(),
		message: 'Tháng sau t trả 1 nửa thôi',
		message_type: MessageType.TEXT,
		read: true,
		sent_at: 'Today',
		sender: Sender.AFFILIATE
	},
	{
		id: Math.random(),
		message: 'Dạo này đói kém lắm',
		message_type: MessageType.TEXT,
		read: true,
		sent_at: 'Today',
		sender: Sender.AFFILIATE
	},
	{
		id: Math.random(),
		message: 'nhé',
		message_type: MessageType.TEXT,
		read: true,
		sent_at: 'Today',
		sender: Sender.AFFILIATE
	},
	{
		id: Math.random(),
		message: 'https://i.pinimg.com/736x/5b/f1/45/5bf1459bb961c2268f01c39703fe83a2.jpg',
		message_type: MessageType.IMAGE,
		read: true,
		sent_at: 'Jul, 28',
		sender: Sender.AFFILIATE
	},
	{
		id: Math.random(),
		message: 'nhé',
		message_type: MessageType.TEXT,
		read: true,
		sent_at: 'Today',
		sender: Sender.AFFILIATE
	},
	{
		id: Math.random(),
		message: 'nhé',
		message_type: MessageType.TEXT,
		read: true,
		sent_at: 'Today',
		sender: Sender.AFFILIATE
	},
	{
		id: Math.random(),
		message: 'Ờ đc r, đm nhắn ít thôi',
		message_type: MessageType.TEXT,
		read: true,
		sent_at: 'Today',
		sender: Sender.MERCHANT
	},
	{
		id: Math.random(),
		message: 'như thằng điên ý 🤬',
		message_type: MessageType.TEXT,
		read: true,
		sent_at: 'Today',
		sender: Sender.MERCHANT
	},
	{
		id: Math.random(),
		message: 'Xin',
		message_type: MessageType.TEXT,
		read: true,
		sent_at: 'Today',
		sender: Sender.AFFILIATE
	},
	{
		id: Math.random(),
		message: 'Đừng có mà nhây',
		message_type: MessageType.TEXT,
		read: true,
		sent_at: 'Jul, 28',
		sender: Sender.MERCHANT
	},
	{
		id: Math.random(),
		message: 'Vai lin con meo pho',
		message_type: MessageType.TEXT,
		read: true,
		sent_at: 'Today',
		sender: Sender.AFFILIATE
	},
	{
		id: Math.random(),
		message: 'https://i.pinimg.com/564x/dd/25/18/dd2518418a893547ba113d68d8c0278d.jpg',
		message_type: MessageType.IMAGE,
		read: true,
		sent_at: 'Today',
		sender: Sender.AFFILIATE
	},
	{
		id: Math.random(),
		message: 'Hôm nay c mời Phúc Long nhé',
		message_type: MessageType.TEXT,
		read: true,
		sent_at: 'Today',
		sender: Sender.AFFILIATE
	},
	{
		id: Math.random(),
		message: 'Oke c, full topping nhé',
		message_type: MessageType.TEXT,
		read: true,
		sent_at: 'Today',
		sender: Sender.MERCHANT
	},
	{
		id: Math.random(),
		message: 'Oke lun',
		message_type: MessageType.TEXT,
		read: true,
		sent_at: 'Today',
		sender: Sender.AFFILIATE
	},
	{
		id: Math.random(),
		message: 'https://i.pinimg.com/564x/b3/ef/0d/b3ef0dc3cdb41db32c0be700bee8dc9d.jpg',
		message_type: MessageType.IMAGE,
		read: true,
		sent_at: 'Today',
		sender: Sender.MERCHANT
	},
	{
		id: Math.random(),
		message: '/file_upload/bdbf59bea4-UI-StyleGuide-2.pdf',
		message_type: MessageType.FILE,
		read: true,
		sent_at: 'Today',
		sender: Sender.MERCHANT
	},
	{
		id: Math.random(),
		message: '',
		message_type: MessageType.TYPING,
		read: true,
		sent_at: 'Typing...',
		sender: Sender.AFFILIATE
	},
]

export {affiliates, chatMessages}
