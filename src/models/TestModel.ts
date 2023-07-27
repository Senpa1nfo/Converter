export interface Campaign{
    id: string
    name: string
    spend: number
}

export interface Adset{
    id: string
    name: string
    spend: number
    id_campaign: number
}

export interface Ad{
    id: string
    name: string
    spend: number
    id_campaign: number
    id_adset: number
}