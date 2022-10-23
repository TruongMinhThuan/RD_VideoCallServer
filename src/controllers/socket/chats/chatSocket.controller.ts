import ChatSocketServices from "@services/ChatSocketServices";
import { Socket } from "socket.io";

export class ChatSocketController {

    _socket: Socket
    protected chatSocketServices: ChatSocketServices

    constructor(socket: Socket) {
        this._socket = socket
        this.chatSocketServices = new ChatSocketServices(socket)
        this.handleChatRoom()
        this.handleSocketDisconnection()
    }

    // private handleChatRoomMessage(room: string) {

    //     this._socket.on('message', (message) => {
    //         console.log('room  ', `${room}`);
    //         console.log('client message : ', message);

    //         this._socket.to(room).emit('message', message)
    //     })
    // }

    private handleChatRoom() {
        this._socket.on('room:join', (roomId) => {
            let room = `room-${roomId}`
            this._socket.join(room)
            console.log(`${this.chatSocketServices._client_uuid} has join to room ${roomId} `);
            this._socket.on(room, (message) => {
                console.log('room  ', `${room}`);
                console.log('client message : ', message);

                this._socket.to(room).emit('message', message)
                message.participants.map((e: any) => {
                    
                    this._socket.broadcast.emit(`broadcast-${e._id}`, message)
                    console.log('broadcast:: ',e._id);
                })
            })
        })

        this._socket.on('room:leave', (roomId) => {
            console.log(`${this.chatSocketServices._client_uuid} has left room ${roomId} `);
            this._socket.leave(roomId)

        })

        this._socket.on('message', (message) => {
            console.log('conversation message: ', message);

        })

    }

    private handleSocketDisconnection() {
        this._socket.on('disconnect', () => {
            this.chatSocketServices.disconnection()
        })
    }
}