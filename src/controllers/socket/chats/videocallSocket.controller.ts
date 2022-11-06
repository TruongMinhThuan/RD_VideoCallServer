import Conversation from "@models/conversation.model";
import ChatSocketServices from "@services/ChatSocketServices";
import { Socket } from "socket.io";

let offerData: object
let streamUrl: string = null
export class VideoCallSocketController {

    _socket: Socket
    protected chatSocketServices: ChatSocketServices
    offer: object

    constructor(socket: Socket) {
        this._socket = socket
        this.handleVideoCall()
    }

    private handleVideoCall() {
        this._socket.on('videocall:offer', (data) => {
            console.log('video call offer:: ', data);

            this.addConversationOfferVideo(data.conversationId, data.offer)
        })

        this._socket.on('videocall:answer', (data) => {
            console.log('video call answer:: ', data);

            this.addConversationAnswerVideo(data.conversationId, data.answer)
        })

        this._socket.on('videocall:join-with-candidates', (data) => {
            console.log('video call candidates:: ', data);
            // this.addConversationVideoCandidates(data.conversationId, data)


            if (data.from == 'caller') {
                this.addConversationVideoCallerCandidates(data.conversationId, data.candidate)
            }
            if (data.from == 'callee') {
                this._socket.broadcast.emit('videocall:joined-candidates', data)
                this.addConversationVideoCalleeCandidates(data.conversationId, data.candidate)
            }

        })

        this._socket.on('videocall:cancel', (data) => {
            console.log('video call offer:: ', data);
            this.removeConversationOfferVideo(data.conversationId)

        })


    }

    public async addConversationOfferVideo(conversationId: string, offer: any) {
        await Conversation.findOneAndUpdate({ _id: conversationId }, { offer: offer })
    }

    public async addConversationAnswerVideo(conversationId: string, answer: any) {
        await Conversation.findOneAndUpdate({ _id: conversationId }, { answer: answer })
    }

    public async removeConversationOfferVideo(conversationId: string) {
        await Conversation.findOneAndUpdate({ _id: conversationId }, { offer: null, answer: null, caller: [], callee: [], videocall_candidates: [] })
    }

    public async addConversationVideoCallerCandidates(conversationId: string, candidates: any) {
        await Conversation.findOneAndUpdate({ _id: conversationId }, { $push: { caller: candidates } })
    }

    public async addConversationVideoCalleeCandidates(conversationId: string, candidates: any) {
        await Conversation.findOneAndUpdate({ _id: conversationId }, { $push: { callee: candidates } })
    }

    public async addConversationVideoCandidates(conversationId: string, candidates: any) {
        await Conversation.findOneAndUpdate({ _id: conversationId }, { $push: { videocall_candidates: candidates } })
    }

    private handleCallRoomVideo() {
        // this._socket.on()
    }


    private handleSocketDisconnection() {
        this._socket.on('disconnect', () => {
            this.chatSocketServices.disconnection()
        })
    }
}