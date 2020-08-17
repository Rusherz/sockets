import * as WebSocket from "ws"

export interface SpWebSocket extends WebSocket {
    isAlive: Boolean;
}