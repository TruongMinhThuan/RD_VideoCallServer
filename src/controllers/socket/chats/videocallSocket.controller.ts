import CallingParticipant from "@models/calling-participant.model";
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
            console.log('====================================');
            console.log('caller::: ', data.caller);
            console.log('====================================');
            this.addConversationOfferVideo(data.conversationId, data.offer, data.caller._id)
        })

        this._socket.on('videocall:answer', (data) => {
            console.log('====================================');
            console.log('answer:::', data);
            console.log('====================================');
            this.addConversationAnswerVideo(data.conversationId, data.answer, data.user._id)
            this._socket.broadcast.emit('videocall:have-answer', data)
        })

        this._socket.on('videocall:join-with-candidates', (data) => {
            // this.addConversationVideoCandidates(data.conversationId, data)
            this.addConversationCallingCandidates(data.conversationId, data.candidate, data.user._id)

            // if (data.from == 'caller') {
            //     this.addConversationVideoCallerCandidates(data.conversationId, data.candidate, data.user._id)
            // }
            // if (data.from == 'callee') {
            //     this._socket.broadcast.emit('videocall:joined-candidates', data)
            //     this.addConversationVideoCalleeCandidates(data.conversationId, data.candidate, data.user._id)
            // }

            this._socket.broadcast.emit('videocall:joined-candidates', data)


        })

        this._socket.on('videocall:cancel', (data) => {
            this.removeConversationOfferVideo(data.conversationId)

        })


    }

    public async addConversationCallingCandidates(conversationId: string, candidates: any, userId: string) {
        const conversation = await CallingParticipant.findOneAndUpdate({
            conversation: conversationId, participant: userId
        }, {
            $push: { candidate_data: candidates }
        })

    }

    public async addConversationOfferVideo(conversationId: string, offer: any, participantId: string) {
        try {
            const callingParticipant = new CallingParticipant()
            callingParticipant.conversation = Object(conversationId)
            callingParticipant.participant = Object(participantId)
            callingParticipant.offer = offer
            await callingParticipant.save()
            const conversation = await Conversation.findOneAndUpdate({
                _id: conversationId
            },
                {
                    offer: offer, $push: { calling_participants: callingParticipant }
                }
            )


        } catch (error) {
            console.log('====================================');
            console.log('error: ', error);
            console.log('====================================');
        }


    }

    public async addConversationAnswerVideo(conversationId: string, answer: any, participantId: string) {
        const callingParticipant = new CallingParticipant()
        callingParticipant.conversation = Object(conversationId)
        callingParticipant.participant = Object(participantId)
        callingParticipant.answer = answer
        await callingParticipant.save()

        await Conversation.findOneAndUpdate({ _id: conversationId }, { answer: answer, $push: { calling_participants: callingParticipant } })
    }

    public async removeConversationOfferVideo(conversationId: string) {
        await Conversation.findOneAndUpdate({ _id: conversationId }, { offer: null, answer: null, caller: [], callee: [], videocall_candidates: [] })
    }

    public async addConversationVideoCallerCandidates(conversationId: string, candidates: any, userId: string) {
        // await Conversation.findOneAndUpdate({ _id: conversationId }, { $push: { caller: candidates } })

        const conversation = await CallingParticipant.findOneAndUpdate({ conversation: conversationId, participant: userId }, { $push: { candidate_data: candidates } })
        // let participant_candidate = conversation?.calling_participants?.find(e => e.conversation = Object(conversationId))
        // console.log('====================================');
        // console.log('aa: ', participant_candidate);
        // console.log('====================================');
        // if (participant_candidate) {
        //     participant_candidate?.candidate_data.push(candidates)
        // }

        // .map(e => e.candidate_data.push({ candidate: '1', sdpMid: '1', sdpMLineIndex: '1 ' }))

        // conversation.calling_participants[0]?.candidate_data.push(candidates)

        // await conversation.update()
    }

    public async addConversationVideoCalleeCandidates(conversationId: string, candidates: any, userId: string) {
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