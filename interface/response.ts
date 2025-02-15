export type ResponseAPI<T = undefined> = {
    message: string
    data?: T
    error?: string[] | ''
    status: boolean,
    meta?: any
}