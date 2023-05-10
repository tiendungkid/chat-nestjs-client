import {ChatMessage as Messages} from 'types/conversation/chat-message'
import {MessageType} from 'types/conversation/message-type'
import {Sender} from 'types/conversation/sender'

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
		message: 'Tao còn đi mua cơm nữa, đói vkhjgjh',
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

export {chatMessages}
