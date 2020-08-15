import React from 'react';
import Input from '../../components/Input';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { BodyHome } from './styles';
import FacebookLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';
import { TiSocialFacebookCircular } from 'react-icons/ti';
import GoogleLogin from 'react-google-login';
import Button from '../../components/Button';


function Home() {
  function handleLoginWithFacebook() {

  }
  const responseFacebook = (resposta: ReactFacebookLoginInfo) => {
    console.log(resposta);
  }
  const responseGoogle = (response: any) => {
    console.log(response);
  }
  return (
    <BodyHome >
      < NavBar logged={true} />
      <main className='container'>
        <form>
          <h1>Find your <br /> dreamteam!</h1>
          <Input name="email" label="E-mail ou nome de usuário" />
          <Input name="senha" type="password" label="Senha" subLabel="Esqueceu a senha?" pathSubLabel="#" />
          <Button type="submit">Entrar</Button>
          <p>ou</p>

          <FacebookLogin
            appId="1088597931155576"
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="my-facebook-button-class"
            icon={<TiSocialFacebookCircular />}
          />
          <GoogleLogin
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          <p>Novo no Conectar? <Link to="/signup">Crie uma conta</Link></p>
        </form>

      </main>
    </BodyHome>
  )
}
export default Home;