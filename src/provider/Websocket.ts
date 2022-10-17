import WebSocket, { WebSocketServer, Event } from 'ws';
import { v4 } from 'uuid';
import { IncomingMessage } from 'http';
import { Server, Socket } from 'socket.io';

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

    // wss.on("connection", (socket) => {
    //   console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
    // });

    wss.on('connection', ((socket) => {
      console.log('connected to websocket...');
      // const myURL = new URL(socket.request.headers.host);
      // console.log('params:: ', myURL.searchParams.get('user_id'))
      // let a = new URL(req.url, `http://${req.headers.host}`);

      // console.log('user: ', a.searchParams.get('user_id'));
      const { client_uuid, conversation_id } = this.getConnectionParams(socket.request)
      if (conversation_id) {
        socket.join(conversation_id)
      }
      // Websocket.clients.set(client_uuid, { id: client_uuid, client: socket })
      console.log('client [%s] connected to conversation: [%s]', client_uuid, conversation_id);
      socket.on('message', (message) => {
        console.log('client message : ', message);
        socket.to(conversation_id).emit('message', message)

      })


      // socket.request.headers.host
      // socket.emit('basicEmit', 1, 'hehhe')
      // client .on('message', (data) => {
      //   console.log('ws data:: ', data);
      //   console.log('ws clients:: ', Websocket.clients.size);
      //   const userSocket: WebSocket = Websocket.clients.get(client_uuid)?.ws
      //   if (userSocket) {
      //     console.log('user socket:: ', userSocket);
      //     userSocket.send('hahahaha')
      //   }
      //   ws.emit('room1', { message: 'hello world' })
      // });

      // ws.on('close', () => {
      //   Websocket.clients.delete(client_uuid)
      //   console.log(`${client_uuid} disconnected: `, Websocket.clients.size);

      // })

    }));

  }


  public static socket() {
    return wss;
  }
}

export default Websocket;
