import './App.css'
import Navbar from './components/Navbar/Navbar'
import Garage from './components/Garage/Garage';
import Footer from './components/Footer/Footer';
import { useEffect, useState } from 'react';

type SpotState = {
  [key: string]: boolean;
};

function App() {
  const [spots, setSpots] = useState<SpotState>({});
  const [isConnected, setIsConnected] = useState(false);

  const wurl = 'wss://rafeu.squareweb.app/parking/updates';

  useEffect(() => {
    const ws = new WebSocket(wurl);

    ws.onopen = () => {
      console.log('Conexão estabelecida');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Atualiza apenas a vaga específica recebida
      setSpots(prev => ({
        ...prev,
        [data.spotId]: data.isOccupied
      }));
    };

    ws.onclose = () => {
      console.log('Conexão fechada');
      setIsConnected(false);
    };

    ws.onerror = (err) => {
      console.error('Erro na conexão:', err);
      setIsConnected(false);
    };
    
  }, [wurl]);

  return (
    <div id='first'>
      <div id='second'>
        <Navbar />
        <div className="connection-status">
          {isConnected ? 'Online' : 'Offline'}
        </div>
      </div>

      <div id='third'>
        {/* Vagas fixas com IDs pré-definidos */}
        {['00001', '00002', '00003', '00004'].map((spotId) => (
          <Garage
            key={spotId}
            boolean={spots[spotId] || false} // Default para false se não recebido
            name={spotId}
          />
        ))}
      </div>

      <Footer>Feito por Grupo xx - UNIVESP</Footer>
    </div>
  )
}

export default App;