import React from 'react';
import NavBar from '../../components/NavBar';
import { BodyHome } from './styles';
import Login from '../../components/Login';
import ProjectCards from '../../components/ProjectCards';


function Home() {

  return (
    <BodyHome >
      < NavBar logged={true} />
      <main>
        <div className="area-login">
            <h1>Find your <br /> dreamteam!</h1>
            <Login />
        </div>
        <div className="saiba-como-acontece">

          <h3>Saiba como tudo acontece:</h3>
          <p>Tire sua ideia do papel e encontre em segundos o time ideal para realizá-la com sucesso.</p>
          <section className="depoimentos">

          </section>
        </div>
        <div className="projetos-em-alta">

          <h3>Projetos em alta</h3>
          <section className="cards-em-altas">
            <ProjectCards />
          </section>
          
        </div>
        <div className="quem-ja-usou">

          <h3><strong>QUEM JÁ USOU </strong>O CONECTAR</h3>
          <section className="depoimentos">

          </section>
        </div>

      </main>
      <footer>

      </footer>
    </BodyHome>
  )
}
export default Home;