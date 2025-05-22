import './App.css'
import Navbar from './components/Navbar/Navbar'
import Garage from './components/Garage/Garage';
import Footer from './components/Footer/Footer';
import { useEffect, useState, useRef } from 'react';

type SpotState = {
  [key: string]: boolean;
};

function App() {
  const [spots, setSpots] = useState<SpotState>({});
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const wurl = 'wss://rafeu.squareweb.app/parking/updates';

  const connectWebSocket = () => {
    const ws = new WebSocket(wurl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('Conexão estabelecida');
      setIsConnected(true);
      // Inicia heartbeat após conexão
      startHeartbeat();
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSpots(prev => ({
        ...prev,
        [data.spotId]: data.isOccupied // Corrigido para isOccupied (verificar ortografia do servidor)
      }));
    };

    ws.onclose = (event) => {
      console.log('Conexão fechada:', event.code, event.reason);
      setIsConnected(false);
      stopHeartbeat();
      // Reconexão exponencial com backoff
      scheduleReconnection();
    };

    ws.onerror = (err) => {
      console.error('Erro na conexão:', err);
      ws.close();
    };
  };

  const startHeartbeat = () => {
    const heartbeatInterval = setInterval(() => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000);

    return () => clearInterval(heartbeatInterval);
  };

  const stopHeartbeat = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
  };

  const scheduleReconnection = () => {
    if (!reconnectTimeoutRef.current) {
      reconnectTimeoutRef.current = setTimeout(() => {
        console.log('Tentando reconectar...');
        connectWebSocket();
        reconnectTimeoutRef.current = null;
      }, 5000);
    }
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      // Cleanup ao desmontar o componente
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []); // Executa apenas no mount/unmount

  return (
    <div id='first'>
      <div id='second'>
        <Navbar />
        <div className="connection-status">
          {isConnected ? (
            <span style={{ color: 'green' }}>● Online</span>
          ) : (
            <span style={{ color: 'red' }}>● Offline - Reconectando...</span>
          )}
        </div>
      </div>

      <div id='third'>
        {['00001', '00002', '00003', '00004'].map((spotId) => (
          <Garage
            key={spotId}
            boolean={spots[spotId] ?? false}
            name={spotId}
          />
        ))}
      </div>

      <Footer>Feito por Grupo xx - UNIVESP</Footer>
    </div>
  );
}

export default App;