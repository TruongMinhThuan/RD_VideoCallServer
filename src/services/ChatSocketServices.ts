import { IncomingMessage } from "http";
import { Socket } from "socket.io";

export default class ChatSocketServices {

    protected socket: Socket
    _client_uuid: string
    _conversation_id: string
    _room_joining: string

    constructor(socket: Socket) {
        this.socket = socket
        this.getConnectionParams(socket.request)
    }

    private getConnectionParams(req: IncomingMessage) {
        const host = new URL(req.url, `http://${req.headers.host}`)
        this._client_uuid = host.searchParams.get('user_id')
        this._conversation_id = host.searchParams.get('conversation_id')
    }

    joinRoom() {
        if (this._conversation_id) {
            this.socket.join(this._conversation_id)
        }
        console.log('client [%s] connected to conversation: [%s]', this._client_uuid, this._conversation_id);
        // this.socket.on('message', (message) => {
        //     console.log('client message : ', message);
        //     this.socket.to(this._conversation_id).emit('message', message)

        // })
    }

    disconnection() {
        console.log(`${this._client_uuid} has disconnected: `);
    }

}