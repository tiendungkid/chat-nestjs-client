import {Sender} from './sender'
import {MessageType} from './message-type'

export interface ChatMessage {
	id: number;
	message: string;
	message_type: MessageType;
	sent_at: string;
	read: boolean;
	sender: Sender
}
