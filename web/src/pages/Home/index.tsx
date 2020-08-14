import React from 'react';
import Input from '../../components/Input';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { BodyHome} from './styles';
function Home() {
  return (
    <BodyHome >
      < NavBar logged={true}/>
      <main className='container'>
        <form>
          <h1>Find your <br /> dreamteam!</h1>
          <Input name="email" label="E-mail ou nome de usuário" />
          <Input name="senha" label="Senha" subLabel="Esqueceu a senha?" pathSubLabel="#"/>
          <button type="submit">Entrar</button>
          <p>ou</p>
          <p>Novo no Conectar? <Link to="/signup">Crie uma conta</Link></p>
        </form>
      </main>
    </BodyHome>
  )
}
export default Home;