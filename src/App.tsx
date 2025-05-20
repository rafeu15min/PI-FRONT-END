import './App.css'
import Navbar from './components/Navbar/Navbar'
import Garage from './components/Garage/Garage';
import Paragraphy from './components/Paragraphy/Paragraphy';
import Footer from './components/Footer/Footer';
import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState<any[]>([])

  const wurl = 'wss://rafeu.squareweb.app/parking/updates'

  const ws = new WebSocket(wurl)

  useEffect(() => {  

    ws.onopen = () => {
      console.log('conectado')
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      logbest(data)
      setMessage([data, data, data, data])
    }

    function logbest(data: any) {
      console.log(data)
    }

    ws.onclose = () => {
      console.log('Desconectado')
    }

    ws.onerror = (err: any) => {
      console.log(err)
    }

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN)
        ws.close()
    }
  }, [wurl])
console.log(message)
  return (
    <div id='first'>
      <div id='second'>
        <Navbar />
      </div>
      <div id='third'>
        {
          Array.isArray(message) ? (
          message.map(index => (
            <Garage key={index.spotId} boolean={index.isOccupied} name={index.spotId}/>
          ))
        ) : (
          <p>Espere</p>
        )
        }
      </div>
      <Footer>Feito por Grupo xx - UNIVESP</Footer>
    </div>
  )
}

export default App;
