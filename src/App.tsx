import './App.css'
import Navbar from './components/Navbar/Navbar'
import Garage from './components/Garage/Garage';
import Paragraphy from './components/Paragraphy/Paragraphy';
import Footer from './components/Footer/Footer';

function App() {

  const ws = new WebSocket('wss://rafeu.squareweb.app/parking/updates')

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)

    console.log('Atualização', data)
  }
  console.log(ws)
  return (
    <div id='first'>
      <div id='second'>
        <Navbar />
      </div>
      <div id='third'>
        <Garage boolean={false} />
        <Garage boolean={true} />
        <Garage boolean={true} />
        <Garage boolean={true} />
      </div>
      <div id='fourth'> 
        <Paragraphy>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima, obcaecati eum fugiat atque recusandae voluptatem laborum sed autem nobis a, maxime repellat voluptate doloremque voluptates ipsam, consequuntur dolorum sapiente quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, quia. Autem similique reprehenderit explicabo eligendi deleniti dolore atque amet, pariatur nostrum aspernatur distinctio tempora? Molestias cum voluptatibus at mollitia ad. Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore voluptates dolorem expedita, tempore porro nobis, voluptatem illum sequi sapiente molestiae cumque neque quas iste in consequatur alias, facilis modi reprehenderit! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias nobis molestiae cum quasi. Ducimus numquam vero, reiciendis cupiditate ratione velit, nobis laudantium molestiae, dicta necessitatibus quidem magni consectetur saepe tempora! Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, temporibus magni? Molestias laborum magni ipsam dolore voluptatem. Sed illo ratione nesciunt atque rerum beatae impedit alias ipsum. Facere, ex placeat! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe aut quasi nesciunt sint eius ipsum temporibus. Voluptate ipsa eligendi perferendis doloribus libero? Culpa mollitia saepe commodi odit, unde recusandae cupiditate? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde ipsa odit quas fugit quasi, sunt sed assumenda sit iure omnis, suscipit totam nam ipsum repellat obcaecati a doloremque dolorum dolor. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius laboriosam hic pariatur. Cupiditate ducimus exercitationem aperiam corrupti, atque culpa, explicabo odio quibusdam quis optio velit dolorum necessitatibus fuga eos voluptatum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. At id doloremque nobis dolor facere quia nemo labore itaque aut ipsum, earum saepe vel commodi culpa error, aperiam ex consequatur tempore.</Paragraphy>
        <Paragraphy>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima, obcaecati eum fugiat atque recusandae voluptatem laborum sed autem nobis a, maxime repellat voluptate doloremque voluptates ipsam, consequuntur dolorum sapiente quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, quia. Autem similique reprehenderit explicabo eligendi deleniti dolore atque amet, pariatur nostrum aspernatur distinctio tempora? Molestias cum voluptatibus at mollitia ad. Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore voluptates dolorem expedita, tempore porro nobis, voluptatem illum sequi sapiente molestiae cumque neque quas iste in consequatur alias, facilis modi reprehenderit! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias nobis molestiae cum quasi. Ducimus numquam vero, reiciendis cupiditate ratione velit, nobis laudantium molestiae, dicta necessitatibus quidem magni consectetur saepe tempora! Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, temporibus magni? Molestias laborum magni ipsam dolore voluptatem. Sed illo ratione nesciunt atque rerum beatae impedit alias ipsum. Facere, ex placeat! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe aut quasi nesciunt sint eius ipsum temporibus. Voluptate ipsa eligendi perferendis doloribus libero? Culpa mollitia saepe commodi odit, unde recusandae cupiditate? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde ipsa odit quas fugit quasi, sunt sed assumenda sit iure omnis, suscipit totam nam ipsum repellat obcaecati a doloremque dolorum dolor. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius laboriosam hic pariatur. Cupiditate ducimus exercitationem aperiam corrupti, atque culpa, explicabo odio quibusdam quis optio velit dolorum necessitatibus fuga eos voluptatum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. At id doloremque nobis dolor facere quia nemo labore itaque aut ipsum, earum saepe vel commodi culpa error, aperiam ex consequatur tempore.</Paragraphy>
      </div>
      <Footer>Feito por Grupo xx - UNIVESP</Footer>
    </div>
  )
}

export default App;
