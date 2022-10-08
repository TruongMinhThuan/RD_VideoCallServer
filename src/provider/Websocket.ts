import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

class Websocket {
  public static init(): void {
    wss.on('connection', (ws) => {
      console.log('connected to websocket...');

      ws.on('message', (data) => {
        console.log('ws data:: ', data);
        ws.send('something...');
      });
    });
  }

  public static socket() {
    return wss;
  }
}

export default Websocket;
