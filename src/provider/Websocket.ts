import WebSocket, { WebSocketServer, Event } from 'ws';
import { v4 } from 'uuid';
import { IncomingMessage } from 'http';
const wss = new WebSocketServer({ port: 8080 });

class Websocket {

  static clients = new Map()

  constructor() {
    // Websocket.clients = new Set()
  }

  private getConnectionUserId(req: IncomingMessage) {
    const host = new URL(req.url, `http://${req.headers.host}`)
    return host.searchParams.get('user_id')
  }

  public async init(): Promise<any> {
    wss.on('connection', (ws, req: IncomingMessage) => {
      console.log('connected to websocket...');
      // const myURL = new URL(req.);
      // console.log('params:: ', myURL.searchParams.get('user_id'))
      // let a = new URL(req.url, `http://${req.headers.host}`);

      // console.log('user: ', a.searchParams.get('user_id'));
      const client_uuid = this.getConnectionUserId(req)
      Websocket.clients.set(client_uuid, { id: client_uuid, ws: ws })
      console.log('client [%s] connected', client_uuid);
      ws.on('message', (data) => {
        console.log('ws data:: ', data);
        console.log('ws clients:: ', Websocket.clients.size);
        const userSocket: WebSocket = Websocket.clients.get(client_uuid)?.ws
        if (userSocket) {
          console.log('user socket:: ', userSocket);
          userSocket.send('hahahaha')
        }
      });

      ws.on('close', () => {
        Websocket.clients.delete(client_uuid)
        console.log('disconnect: ', Websocket.clients.size);

      })

    });

  }


  public static socket() {
    return wss;
  }
}

export default Websocket;
