import React from 'react';
import NavBar from '../../components/NavBar';
import { BodyHome } from './styles';
import Login from '../../components/Login';
import ProjectCards from '../../components/ProjectCards';
import hero from '../../assets/image/hero.svg';

function Home() {

  return (
    <BodyHome>
      <main className="topo-background">
        < NavBar logged={false} />
        <div className="container topo">
          <section className="area-login">
            <h1>Find your <br /> dreamteam!</h1>
            <Login />
          </section>
          <section className="hero">
            <img src={hero} alt="imagem de redes neurais" />
          </section>
        </div>
      </main>
      <div className="saiba-como-acontece container">

        <h3>Saiba como tudo acontece:</h3>
        <p>Tire sua ideia do papel e encontre em segundos o time ideal para realizá-la com sucesso.</p>
        <section className="depoimentos">

        </section>
      </div>
      <div className="projetos-em-alta container">

        <h3>Projetos em alta</h3>
        <section className="cards-em-alta">
          <ProjectCards />
          <ProjectCards />
          <ProjectCards />
          <ProjectCards />
          <ProjectCards />
          <ProjectCards />
        </section>

      </div>
      <div className="quem-ja-usou container">

        <h3><strong>QUEM JÁ USOU </strong>O CONECTAR</h3>
        <section className="depoimentos">

          <aside>
            <img src="https://f.i.uol.com.br/fotografia/2017/12/08/15127517365a2ac27864415_1512751736_3x4_md.jpg" alt="" />
            <i>O conenectar me possibilitou montar o time ideal para dar presentes pelo mundo todo</i>
            <strong>Noel</strong>
            <p>Doador de presentes</p>
          </aside>
          <aside>
            <img src="https://f.i.uol.com.br/fotografia/2017/12/08/15127517365a2ac27864415_1512751736_3x4_md.jpg" alt="" />
            <i>O conenectar me possibilitou montar o time ideal para dar presentes pelo mundo todo</i>
            <strong>Noel</strong>
            <p>Doador de presentes</p>
          </aside>
          <aside>
            <img src="https://f.i.uol.com.br/fotografia/2017/12/08/15127517365a2ac27864415_1512751736_3x4_md.jpg" alt="" />
            <i>O conenectar me possibilitou montar o time ideal para dar presentes pelo mundo todo</i>
            <strong>Noel</strong>
            <p>Doador de presentes</p>
          </aside>
        </section>
      </div>

      <footer>

      </footer>
    </BodyHome>
  )
}
export default Home;