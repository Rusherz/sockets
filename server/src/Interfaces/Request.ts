interface SpHeaders extends Headers {
    host: string
}

export interface SpRequest extends Request {
    userId: string
    serverId: string
    headers: SpHeaders
}
