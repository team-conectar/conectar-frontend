import React from 'react';
import { BodyLogin } from './styles';
import { Link } from 'react-router-dom';
import Input from '../Input';
import FacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import {FcGoogle } from 'react-icons/fc';
import {FaFacebook} from 'react-icons/fa';
import Button from '../Button';

import { TiSocialFacebookCircular } from 'react-icons/ti';

const Login: React.FC = () => {

  const responseFacebook = (resposta: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    console.log(resposta);
  }
  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response);
  }
  return (
    <BodyLogin>

      <Input name="email" label="E-mail ou nome de usuário" />
      <Input name="senha" type="password" label="Senha" subLabel="Esqueceu a senha?" pathSubLabel="#" />
      <Button type="submit">Entrar</Button>
      <p>ou</p>
      <aside>
        <FacebookLogin
          textButton=""
          appId="1088597931155576"
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook}
          cssClass="facebook-button"
          icon={<FaFacebook/>}
        />
        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          render={renderProps => (
            <button className="google-button" onClick={renderProps.onClick} disabled={renderProps.disabled}><FcGoogle /></button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </aside>
      <p>Novo no Conectar? <Link to="/signup">Crie uma conta</Link></p>
    </BodyLogin>
  )

}

export default Login;