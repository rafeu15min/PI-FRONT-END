import { EventEmitter } from "eventemitter3";

class WSParkingSpotService extends EventEmitter {
  private url: string = "wss://rafeu.squareweb.app/parking/updates";
  private socket: WebSocket | null = null;
  private heartbeatInterval: any;

  connect() {
    this.connectWebSocket();
  }

  private connectWebSocket() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("Conexão estabelecida");
      this.startHeartbeat();
    };

    this.socket.onclose = (ev) => {
      console.log("Conexão fechada:", ev.code, ev.reason);
      this.stopHeartbeat();
      this.scheduleReconnection();
    };

    this.socket.onerror = (err) => {
      console.error("Erro na conexão:", err);
      if (this.socket) {
        this.socket.close();
      }
    };

    this.socket.onmessage = (ev) => {
      const data = JSON.parse(ev.data);
      this.emit("spots", { id: data.spotId, isOccupied: data.isOccupied });
    };
  }

  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.socket?.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ type: "ping" }));
      }
    }, 3000);

    return () => clearInterval(this.heartbeatInterval);
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearTimeout(this.heartbeatInterval);
    }
  }

  private scheduleReconnection() {
    if (!this.heartbeatInterval) {
      this.heartbeatInterval = setTimeout(() => {
        console.log("Tentando reconectar...");
        this.connectWebSocket();
        this.heartbeatInterval = null;
      }, 5000);
    }
  }

  sendMessage(mesg: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(mesg));
    }
  }
}

export const wsParkingSpotService = new WSParkingSpotService();
