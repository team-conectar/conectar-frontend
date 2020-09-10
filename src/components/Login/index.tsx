import React, { FormEvent, useState, ChangeEvent } from 'react';
import { BodyLogin } from './styles';
import { Link } from 'react-router-dom';
import Input from '../Input';
import FacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import {FcGoogle } from 'react-icons/fc';
import {FaFacebook} from 'react-icons/fa';
import Button from '../Button';

import axios, { AxiosError } from 'axios';

import { TiSocialFacebookCircular } from 'react-icons/ti';


const Login: React.FC = () => {

  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const responseFacebook = (resposta: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    console.log(resposta);
  }
  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { email, senha } = formData;
    const data = new FormData();
    console.log(`email = ${email}, senha = ${senha}`);
    data.append('username', email);
    data.append('password', senha);
    
    const res = await axios.post('/api/token', data).catch((err: AxiosError) => { 
      // Returns error message from backend
      return err?.response?.data.detail;
    });

    console.log(res);

    // DO SOMETHING
  }

  return (
    <BodyLogin onSubmit={handleSubmit}>

      <Input
        id="email"
        name="email" 
        label="E-mail ou nome de usuário" 
        required
        onChange={handleInputChange}
      />
      <Input
        id="senha"
        name="senha" 
        type="password" 
        label="Senha" 
        subLabel="Esqueceu a senha?" 
        pathSubLabel="#" 
        required
        onChange={handleInputChange} 
      />
      <Button 
        type="submit"
        >
          Entrar
      </Button>
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