import React, {  useState } from 'react';
import { BodySignUp } from './styles';
import logo from '../../assets/image/logo_fundoClaro.svg';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import ToggleSwitch from '../../components/ToggleSwitch';
import { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { monthOptions, yearOptions } from '../../utils/dates';

interface renderFacebook {
  onClick: () => void;
  disabled?: boolean;
}


function SignUp() {

  const history = useHistory();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (_: React.MouseEvent) => {
    // Password confirmation validation

    try {
      // //const data = await signUp(email, password, passwordConfirmation);

      // if (data) {
      //   history.push('/');
      // }
    } catch (err) {
      if (err instanceof Error) {
        // handle errors thrown from frontend
        setError(err.message);
      } else {
        // handle errors thrown from backend
        setError(err);
      }
    }
  };

  const [showNextStep, setShowNextStep] = useState<boolean>(false);

  const responseFacebook = (resposta: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    console.log(resposta);
  }
  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response);
  }

  return (
    <BodySignUp showSecondStep={showNextStep}>
      <form className="area-central container">
        <Link to="/"><img src={logo} alt="logo" /></Link>
        <div className="primeira-etapa">

          <img src="" alt="#" className="area-img" />


          <div className="area-form">


            <h1>Criar sua conta</h1>
            <Input name="nome" label="Nome Completo" />
            <Input type="email" name="email" label="E-mail" />
            <section>
              <Input name="user" label="Nome de usuário" />
              <Input type="password" name="password" label="Senha" />
            </section>
            <p>Ao prosseguir, você concorda com os <Link to="#">Termos de Uso</Link> e <Link to="#">Política de Privacidade.</Link></p>

            <section>
              <Link to="login">Já tem uma conta?</Link>
              <Button 
              type="button" 
              onClick={() => setShowNextStep(true)}
              theme="primary-yellow"
              >Continuar
              </Button>
            </section>
            <section>

              <FacebookLogin
                appId="1088597931155576"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="facebook-button"
                textButton="Cadastre-se com Facebook"
                icon={<FaFacebookF />}

              />
              <GoogleLogin
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                render={renderProps => (
                  <button
                    className="google-button"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle />
                  Inscreva-se com Google
                  </button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />


            </section>
          </div>
        </div>
        <div className="segunda-etapa">
          <legend>
            <h1>Bem vindo(a) ao Conectar</h1>
          </legend>
          <section>
            <Input type="tel" name="phone" label="Celular"></Input>
            <Select
              label="Data de Nascimento"
              name="month"
              defaultOption="Ano"
              options={yearOptions}
            />
            <Select
              name="year"
              defaultOption="Mês"
              options={monthOptions}
            />
            <Input type="number" name="day" placeholder="Dia"></Input>

          </section>
          <section>
            <legend>Tipo de Perfil</legend>
            <span>Selecione um ou mais tipos</span>
          </section>
          <section className="tipo-perfil">
            <fieldset>

              <legend>Idealizador</legend>
              <aside>
                <p>xxxxxxxxxxxxxxxx xxx xxxx</p>
                <ToggleSwitch name="" />

              </aside>
            </fieldset>
            <fieldset>

              <legend>Colaborador</legend>
              <aside>
                <p>xxxxxxxxxxxxxxxx xxx xxxx</p>
                <ToggleSwitch name=""/>


              </aside>
            </fieldset>
            <fieldset>
              <legend>Aliado</legend>
              <aside>
                <p>xxxxxxxxxxxxxxxx xxx xxxx</p>
                <ToggleSwitch name=""/>

              </aside>
            </fieldset>
          </section>
          <section>
            <button className="voltar" type="button" onClick={() => setShowNextStep(false)}>Voltar</button>
            <Button onClick={() => history.push("/profilefeatures")}
            theme="primary-yellow"
            >Continuar</Button>
          </section>
        </div>
      </form>
    </BodySignUp>
  )
}
export default SignUp;