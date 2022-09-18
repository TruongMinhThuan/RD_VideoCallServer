import ChatRoomController from '../controllers/api/rooms/ChatRoomController';
import express from 'express'
const RoomRoute = express.Router()

RoomRoute.post('/room',ChatRoomController.createRoom)

export default RoomRoute