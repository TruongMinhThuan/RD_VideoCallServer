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
            console.log('offer data: ', data);

            let calleeIdList = data?.callee_ids
            if (calleeIdList) {
                let incommingcall: string
                if (calleeIdList.length == 1) {
                    incommingcall = `incommingcall:${calleeIdList[0]}`
                    this._socket.broadcast.emit(incommingcall, data)
                } else if (calleeIdList?.length > 1) {
                    calleeIdList?.forEach((callee: string) => {
                        incommingcall = `incommingcall:${callee}`
                        this._socket.broadcast.emit(incommingcall, data)
                    });
                }
            }

            this.addConversationOfferVideo(data.conversationId, data.offer)
        })

        this._socket.on('videocall:answer', (data) => {
            this.addConversationAnswerVideo(data.conversationId, data.answer)
            this._socket.broadcast.emit('videocall:have-answer', data)
        })

        this._socket.on('videocall:join-with-candidates', (data) => {
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