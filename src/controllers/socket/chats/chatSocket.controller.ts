import ChatSocketServices from "@services/ChatSocketServices";
import { Socket } from "socket.io";

let offerData: object
let streamUrl: string = null
export class ChatSocketController {

    _socket: Socket
    protected chatSocketServices: ChatSocketServices
    offer: object

    constructor(socket: Socket) {
        this._socket = socket
        this.chatSocketServices = new ChatSocketServices(socket)
        this.handleChatRoom()
        this.handleSocketDisconnection()
        this.handleConnection()
    }

    private handleConnection() {

        this._socket.emit('connection', () => {
            console.log(`${this.chatSocketServices._client_uuid} has left room`);

        })
    }

    private handleChatRoom() {
        this._socket.on('room:join', (roomId) => {
            let room = `room-${roomId}`
            this._socket.join(room)
            console.log(`${this.chatSocketServices._client_uuid} has join to room ${roomId} `);
            this._socket.on(room, (message) => {
                this._socket.to(room).emit('message', message)
                message.participants.map((e: any) => {
                    this._socket.broadcast.emit(`broadcast-${e._id}`, message)
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

        this._socket.on('room:videoroom-offer', (data) => {
            offerData = data.offer

            console.log('====================================');
            console.log('call data: ', data);
            console.log('offer: ', offerData);
            console.log('====================================');
        })

        this._socket.on('room:videoroom-join', () => {
            console.log('join video room');
            this._socket.emit('videoroom:client-join-room', offerData)
        })

        this._socket.on('stream', (data) => {
            if (streamUrl === null) {
                streamUrl = data.streamUrl
            }
            console.log('====================================');
            console.log('stream: ', streamUrl);
            console.log('====================================');
        })

        this._socket.on('videoroom:join', (data) => {
            console.log('====================================');
            console.log('join offer:: ', data.offer);
            console.log('join offer:: ', data.streamUrl);
            console.log('====================================');
            this._socket.emit('videoroom:add-participant', { answer: data.offer, streamUrl: data.streamUrl })
        })

    }


    private handleSocketDisconnection() {
        this._socket.on('disconnect', () => {
            this.chatSocketServices.disconnection()
        })
    }
}