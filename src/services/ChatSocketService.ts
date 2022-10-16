import Websocket from "@provider/Websocket";
import { WebSocketServer } from 'ws';

export default class ChatSocketService {
    ws: WebSocketServer
    constructor() {
        this.ws = Websocket.socket()
    }


    emitMessage(message: string) {
        this.ws.emit(message)
    }
}
