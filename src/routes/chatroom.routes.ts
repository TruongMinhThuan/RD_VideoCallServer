import ChatController from '../controllers/api/rooms/ChatController';
import express from 'express'
const RoomRoute = express.Router()

RoomRoute.post('/room',ChatController.createRoom)

export default RoomRoute