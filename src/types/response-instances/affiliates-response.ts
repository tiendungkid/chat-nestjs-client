import {AffiliateMessage} from '../affiliate-chat'

export interface AffiliatesResponse {
    count: number
    rows: AffiliateRowResponse[]
    currentPage: number | null;
    lastPage: number | null;
    nextPage: number | null;
    prevPage: number | null;
}

export interface AffiliateRowResponse {
    id: number
    shop_id: number,
    first_name: string | null
    last_name: string | null
    email: string
    avatar?: string
    latestMessage?: AffiliateMessage
}
