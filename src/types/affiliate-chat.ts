export default interface Affiliate {
	id: number;
	name: string;
	avatar?: string;
	latestMessage?: AffiliateMessage
}

export interface AffiliateMessage {
	id: number;
	from_id: number;
	to_id: number;
	msg: string;
	msg_type: string;
	time_send: number;
	acc_type: AffiliateAccType;
	status: AffiliateChatStatus
}

export enum AffiliateAccType {
	MERCHANT = 'merchant',
	AFFILIATE = 'affiliate'
}
export enum AffiliateChatStatus {
	SEND = '1',
	READ_NOTIFY = '2',
	READ = '3'
}
