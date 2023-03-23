import {Sender} from './sender'
import {MessageType} from './message-type'
import {ReactNode} from 'react'

export interface ChatMessage {
	id: number;
	message: string | ReactNode;
	message_type: MessageType;
	sent_at: string;
	read: boolean;
	sender: Sender
}
