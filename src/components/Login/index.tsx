import React, { FormEvent, useState, useCallback, ChangeEvent } from 'react';
import { BodyLogin } from './styles';
import { Link } from 'react-router-dom';
import Input from '../Input';
import FacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import Button from '../Button';
import api from "../../services/api";
import { AxiosError } from 'axios';
import { useHistory } from "react-router";


import { inputChange } from '../../utils/inputChange';
interface loginProps {
  onSuccessLogin(): void;
}
interface PessoaType {

  colaborador: boolean;
  idealizador: boolean;
  aliado: boolean;

}
const Login: React.FC<loginProps> = ({ onSuccessLogin }) => {
  const history = useHistory();
  const [logged, setLogged] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  /**This function checks the profile is idealizer, collaborator or ally, then redirects to registration these */
  async function checkProfileType() {
    const { aliado, colaborador, idealizador } = (await api.get("/api/v1/pessoas/me")).data;
    if (!aliado || !colaborador || !idealizador) {
      history.push("/signup/2");
    }
  }
  /**Send email name and profile_pic to backend through the login route with provider=facebook then check profile type*/
  const responseFacebook = async (resposta: ReactFacebookLoginInfo) => {
    const { email, name } = resposta;
    const foto_perfil = resposta.picture?.data.url;
    const res = await api
      .post(`/api/login?provider=facebook`, {
        email,
        "nome":name,
        foto_perfil
      })
      .then(() => {
        checkProfileType();
        onSuccessLogin();
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });

    console.log(res);



  }
  const responseGoogle = async (response: GoogleLoginResponse | any) => {
    let { tokenId } = response;
    const res = await api
      .post(`/api/login?provider=google&token=${tokenId}`)
      .then(() => {
        checkProfileType();
        onSuccessLogin();
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
    console.log(res);
  }

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    inputChange(event, setFormData, formData);
  }, [formData]);

  async function handleSubmit(event: FormEvent) {
    /**
     * Handle form submition by creating FormData object, appends
     * data from formData state and send it to backend by using axios
     * @param {FormEvent} event
     */

    event.preventDefault();

    const { email, senha } = formData;
    const data = new FormData();
    console.log(`email = ${email}, senha = ${senha}`);
    data.append('username', email);
    data.append('password', senha);

    const res = await api
      .post('/api/token', data)
      .then(onSuccessLogin)
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });

    console.log(res);

    // DO SOMETHING
  }

  return (
    <BodyLogin onSubmit={handleSubmit}>
      <Input
        mask=""
        id="email"
        name="email"
        label="E-mail ou nome de usuário"
        required
        onChange={handleInputChange}
      />
      <Input
        mask=""
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
        theme="primary-yellow"
      >
        Entrar
      </Button>
      <p>ou</p>
      <aside>
        <FacebookLogin
          textButton=""
          appId="364709984736964"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          cssClass="facebook-button"
          icon={<FaFacebook />}
        />
        <GoogleLogin
          clientId="1027346829762-a6tjn6i5a8r50nn0cskrg4sholipvt5j.apps.googleusercontent.com"
          render={renderProps => (
            <button className="google-button" onClick={renderProps.onClick} disabled={renderProps.disabled}><FcGoogle /></button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </aside>
      <p>Novo no Conectar? <Link to="/signup/1">Crie uma conta</Link></p>
    </BodyLogin>
  )

}

export default Login;