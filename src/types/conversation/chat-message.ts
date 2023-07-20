import {Sender} from './sender'
import {MessageType} from './message-type'

export interface ChatMessage {
	id: number;
	msg: string;
	msg_type: MessageType;
	time_send: number;
	status: string;
	acc_send: Sender
}
