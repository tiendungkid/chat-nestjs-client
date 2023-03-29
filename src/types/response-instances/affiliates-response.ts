export interface AffiliatesResponse {
    count: number
    rows: AffiliateRowResponse[]
}

export interface AffiliateRowResponse {
    id: number
    first_name: string | null
    last_name: string | null
    email: string
    avatar?: string
}
