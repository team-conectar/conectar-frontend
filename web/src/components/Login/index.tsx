import React from 'react';
import { BodyLogin } from './styles';
import { Link } from 'react-router-dom';
import Input from '../Input';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { TiSocialFacebookCircular } from 'react-icons/ti';
import GoogleLogin from 'react-google-login';
import Button from '../Button';


const Login: React.FC = () => {
  function handleLoginWithFacebook() {

  }
  const responseFacebook = (resposta: ReactFacebookLoginInfo) => {
    console.log(resposta);
  }
  const responseGoogle = (response: any) => {
    console.log(response);
  }
  return (
    <BodyLogin>
          
          <Input name="email" label="E-mail ou nome de usuário" />
          <Input name="senha" type="password" label="Senha" subLabel="Esqueceu a senha?" pathSubLabel="#" />
          <Button type="submit">Entrar</Button>
          <p>ou</p>

          <FacebookLogin
            appId="1088597931155576"
            textButton=""
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="facebook-button"
            icon={<TiSocialFacebookCircular className="icon-facebook"/>}
          />
          <GoogleLogin
            className="google-button"
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          <p>Novo no Conectar? <Link to="/signup">Crie uma conta</Link></p>
        </BodyLogin>
  )

}

export default Login;