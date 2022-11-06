import WebSocket, { WebSocketServer, Event } from 'ws';
import { v4 } from 'uuid';
import { IncomingMessage } from 'http';
import { Server, Socket } from 'socket.io';
import ChatSocketServices from '@services/ChatSocketServices';
import { ChatSocketController } from '@controllers/socket/chats/chatSocket.controller';
import { VideoCallSocketController } from '@controllers/socket/chats/videocallSocket.controller';

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  conversation: (message: string) => void;
  message: (message: string) => void;

}

interface ClientToServerEvents {
  hello: () => void;
  message: (message: string) => void;

}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}
// const wss = new WebSocketServer({ port: 8080, });
const wss = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(8080, { /* options */ });

class Websocket {

  static clients = new Map()

  constructor() {
    // Websocket.clients = new Set()
  }

  private getConnectionParams(req: IncomingMessage) {
    const host = new URL(req.url, `http://${req.headers.host}`)
    return {
      client_uuid: host.searchParams.get('user_id'),
      conversation_id: host.searchParams.get('conversation_id')
    }
  }

  public async init(): Promise<any> {

    wss.on('connection', ((socket) => {
      console.log('An user has connected to socket...');
      new ChatSocketController(socket)
      new VideoCallSocketController(socket)
    }));

  }


  public static socket() {
    return wss;
  }
}

export default Websocket;
