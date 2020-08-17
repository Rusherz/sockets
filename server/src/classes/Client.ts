import * as WebSocket from "ws"
import { SpWebSocket } from "../Interfaces/WebSocket"

export default class Client {
    public channels: string[]
    public connection: SpWebSocket

    private id: string

    constructor(id: string, connection: SpWebSocket = null, channels: string[] = []) {
        this.id = id
        this.channels = channels
        this.connection = connection

        if (this.connection) {
            this.connection.on("pong", () => {
                this.connection.isAlive = true
            })
        }
    }

    
    public get Id() : string {
        return this.id
    }
    
}
